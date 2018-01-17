package com.ximalaya.ops.common.web.db;

import org.apache.ibatis.session.SqlSession;

/**
 * Created by nihao on 18/1/16.
 */
public interface ISqlSessionExecutor<T> {
    T execute(SqlSession sqlSession);
}
