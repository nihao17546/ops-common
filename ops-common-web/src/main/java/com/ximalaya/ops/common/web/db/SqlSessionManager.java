package com.ximalaya.ops.common.web.db;

import com.google.common.collect.Lists;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.logging.log4j.Log4jImpl;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.*;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.beans.PropertyVetoException;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by nihao on 18/1/16.
 */
public class SqlSessionManager {
    private static final Logger logger = LoggerFactory.getLogger(SqlSessionManager.class);

    private static int initialPoolSize = 1;
    private static int minPoolSize = 1;
    private static int maxPoolSize = 1;
    private static int maxIdleTime = 1000;

    /*
    key:DbConnectPO#id
     */
    private static final ConcurrentHashMap<String, SqlSessionFactory> sqlSessionFactoryMap = new ConcurrentHashMap<>(20);

    public static SqlSessionFactory getSqlSessionFactory(DbConnectPO connect) {
        String key = connect.getId().toString();
        SqlSessionFactory sessionFactory = sqlSessionFactoryMap.get(key);
        if (sessionFactory == null) {
            synchronized(SqlSessionManager.class){
                sessionFactory = sqlSessionFactoryMap.get(key);
                if (sessionFactory == null) {
                    ComboPooledDataSource dataSource = createNewDataSource(connect);
                    TransactionFactory transactionFactory = new JdbcTransactionFactory();
                    Environment environment = new Environment("development", transactionFactory, dataSource);
                    Configuration configuration = new Configuration(environment);
                    configuration.setLogImpl(Log4jImpl.class);
                    configuration.setCacheEnabled(true);
                    configuration.setLazyLoadingEnabled(true);
                    configuration.setAggressiveLazyLoading(false);
                    configuration.setMultipleResultSetsEnabled(true);
                    configuration.setUseColumnLabel(false);
                    configuration.setAutoMappingBehavior(AutoMappingBehavior.FULL);
                    configuration.setDefaultExecutorType(ExecutorType.REUSE);
                    configuration.setDefaultStatementTimeout(25000);
                    configuration.setMapUnderscoreToCamelCase(true);
                    configuration.addMapper(ICrudDAO.class);
                    configuration.addMapper(IMySqlMetaDataDAO.class);
                    List<String> mapperLocations = Lists.newArrayList("CrudMapper.xml", "MySqlMetaDataMapper.xml");
                    for (String mapper : mapperLocations) {
                        File file = null;
                        try {
                            file = Resources.getResourceAsFile(mapper);
                        } catch (IOException e) {
                            logger.error("can't load file {}", mapper, e);
                            throw new RuntimeException(e);
                        }
                        Resource mapperLocation = new FileSystemResource(file);
                        try {
                            XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(mapperLocation.getInputStream(),
                                    configuration, mapperLocation.toString(), configuration.getSqlFragments());
                            xmlMapperBuilder.parse();
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    }
                    SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
                    sessionFactory = builder.build(configuration);
                    sqlSessionFactoryMap.put(key, sessionFactory);
                }
            }
        }
        return sessionFactory;
    }

    /**
     * 执行单条sql
     * @param connect
     * @param excutor
     * @param <T>
     * @return
     */
    public static <T> T excute(DbConnectPO connect, ISqlSessionExecutor<T> excutor) {
        SqlSessionFactory sessionFactory = getSqlSessionFactory(connect);
        SqlSession session = sessionFactory.openSession(false);
        try {
            T result = excutor.execute(session);
            session.commit();
            return result;
        }catch (Exception e) {
            session.rollback();
            throw new RuntimeException(e);
        }finally {
            session.close();
        }
    }

    public static void excuteTx(DbConnectPO connect, ISqlSessionExecutor... executors){
        List<ISqlSessionExecutor> list = Arrays.asList(executors);
        excuteTx(connect,list);
    }

    /**
     * 执行多条sql
     * @param connect
     * @param executors
     */
    public static void excuteTx(DbConnectPO connect,List<ISqlSessionExecutor> executors){
        SqlSessionFactory sessionFactory = getSqlSessionFactory(connect);
        SqlSession session = sessionFactory.openSession(false);
        try{
            for(ISqlSessionExecutor executor:executors){
                executor.execute(session);
            }
            session.commit();
        }catch (Exception e){
            session.rollback();
            throw new RuntimeException(e);
        }finally {
            session.close();
        }
    }

    /**
     * 执行多条sql
     * @param connect
     * @return
     */
    private static ComboPooledDataSource createNewDataSource(DbConnectPO connect) {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        String host = connect.getHost();
        String userName = connect.getUsername();
        String password = connect.getPassword();
        dataSource.setUser(userName);     //用户名
        dataSource.setPassword(password); //密码
        String jdbcUrl = "jdbc:mysql://" + host;
        if (connect.getPort() != null) {
            jdbcUrl += ":"+connect.getPort();
        }
        // 数据库地址
        dataSource.setJdbcUrl(jdbcUrl+"?useOldAliasMetadataBehavior=true&useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull");
        try {
            dataSource.setDriverClass("com.mysql.jdbc.Driver");
        } catch (PropertyVetoException e) {
            throw new RuntimeException(e);
        }
        dataSource.setInitialPoolSize(initialPoolSize); //初始化连接数
        dataSource.setMinPoolSize(minPoolSize);//最小连接数
        dataSource.setMaxPoolSize(maxPoolSize);//最大连接数
        dataSource.setMaxIdleTime(maxIdleTime);//最大空闲时间，单位秒
        return dataSource;
    }
}
