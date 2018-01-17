/**
 * [XMPlayer description]
 * @author jason.chen
 * @date   2016-02-29
 */
function XMPlayer(select,opt){
    this.panel = $(select);
    this.option = $.extend({

    },opt);
    this.collapsed = false;
    this._init();
}

XMPlayer.prototype = {
    _init:function () {

        this._initElements();
        this._initPlayer();
        this.bindEvents();
    },
    bindEvents:function () {
        var self = this;

        self.panel.find('.j-pswitch').on('click',function () {
            self.toggle();
        });

        this.prevBtn.on('click',function () {
            self.playPrev();
        });

        this.nextBtn.on('click',function () {
            self.playNext();
        });


    },
    hasPrev:function () {
        var fn = this.option['hasPrev'];
        return fn && fn.apply(this) || false;
    },
    hasNext:function () {
       var fn = this.option['hasNext'];
        return fn && fn.apply(this) || false;
    },
    _initElements:function () {
       var con = this.panel;
       this.titleEl = con.find('.j-player-title');
       this.userEl = con.find('.j-player-user');
       this.albumEl = con.find('.j-player-album');
       this.originEl = con.find('.j-cmpto');
       this.introEl = con.find('.j-panel-intro');
       this.pubTimeEl = con.find('.j-ptime');
       this.prevBtn = con.find('.j-prev-btn');
       this.nextBtn = con.find('.j-next-btn');
    },
    isExpanded:function (argument) {
        return this.collapsed;
    },
    hideWplayer:function (argument) {

        this.panel.find('[data-g="wplayer"]').addClass('g-wplayer-hidden');
    },
    showWplayer:function (argument) {
        this.panel.find('[data-g="wplayer"]').removeClass('g-wplayer-hidden');
    },
    toggle:function (argument) {
        if(!this.curSoundId){
            return ;
        }
        this.collapsed = (!this.collapsed);
        this.panel.toggleClass('collapsed');
        return this;
    },
    expand:function () {
       this.collapsed = false;
        this.panel.removeClass('collapsed');
       return this;
    },
    collapse:function () {
        this.collapsed = true;
        this.panel.addClass('collapsed');
        return this;
    },
    play:function (trackInfo,pInfo) {
        var self = this,
            silent = pInfo && pInfo.silent,
            playHead = pInfo && pInfo.playHead || -1;

        // if(self.curSoundId && (self.curSoundId == trackInfo.soundId)){
        //     return this;
        // }
        self.curSoundId = trackInfo.soundId;
        self.mPlayer.jPlayer("setMedia", {
            m4a: trackInfo.src
        });
        self.curPlayBtn = trackInfo.playBtn;
        self.curDuration = trackInfo.duration;
        if(!silent){
            if(playHead > 0){
                self.mPlayer.jPlayer('play',playHead);
            }else{
                self.mPlayer.jPlayer('play');
            }
            self.wPlayer.jPlayer('clearMedia');
            self.hideWplayer();
        }
        self.mPlayer.jPlayer('clearGhostLayer');
        self.wPlayer.jPlayer('clearGhostLayer');

        self.setExtraInfo(trackInfo);
        self.linkBtns();
        return self;
    },
    playCmp:function (info,pInfo) {
        var self = this,
            silent = !!(pInfo && pInfo.silent) ;

        if(self.cmpSoundId && (self.cmpSoundId == info.soundId)){
            !silent && this.wPlayer.jPlayer('play');
            return this;
        }
        self.cmpSoundId = info.soundId;
        self.showWplayer();
        self.wPlayer.jPlayer('clearMedia');
        self.wPlayer.jPlayer("setMedia", {
            m4a: info.src
        });
        if(!silent){
            self.wPlayer.jPlayer('play');
        }
        self.originEl.html(info.origin);
        self.drawCmpBlock(info.matchData,info.duration);
    },
    linkBtns:function () {
        this.prevBtn.prop('disabled',!this.hasPrev());
        this.nextBtn.prop('disabled',!this.hasNext());
    },
    pause:function (info) {
        this.mPlayer.jPlayer('pause');
        return this;
    },
    setMPlayHead:function (p) {
        this.mPlayer.jPlayer('play',p || 0);
    },
    resume:function (playHead) {
        if(playHead > 0){
            this.mPlayer.jPlayer('play',playHead || 0);
        }else{
            this.mPlayer.jPlayer('play');
        }
        return this;
    },
    colors:['#D73925',"#e91dca",'#e371a9',"#21c0b5", "#4fd3f4",  "#AD77C0", "#128bf3", "#0059a6", "#f96538", "#808000"],
    drawCmpBlock:function (mData,duration) {
        var self = this;
            origin = mData.origin || [],
            dest = mData.dest || [],
            oLen = origin.length,
            dLen = dest.length,
            colors = self.colors;

        self.mPlayer.jPlayer('clearGhostLayer');
        self.mPlayer.jPlayer('clearGhostLayer');

        for (var i = 0; i < oLen; i++) {
            self.mPlayer.jPlayer('setGhostLayer', origin[i].sTime, origin[i].eTime,self.curDuration,colors[i] || colors[0]);
            self.wPlayer.jPlayer('setGhostLayer', dest[i].sTime, dest[i].eTime,duration,colors[i] ||  colors[0]);
        }
    },
    setExtraInfo:function (info) {
        var ptime = this.getPubTime(info.pTime);
        this.titleEl.html(info.trackStr).attr('href',info.trackUrl);
        this.userEl.html(info.userStr).attr('href',info.userUrl);
        this.albumEl.html(info.albumStr).attr('href',info.albumUrl);
        this.pubTimeEl.html('（'+ptime.txt+'）').removeClass('s2 s3').addClass(ptime.cls);
        this.introEl.html(info.intro || '暂无简介');
    },
    getPubTime:function(ts){
        var data = {},
            cls = ['','s2','s3'],
            s = 2,
            t = Math.floor((Date.now() - ts) / 60000),
            tip = '分钟',
            notDeal = ts.indexOf('-') > -1;

        if(t < 1){
            t = 1;
        }
        if(notDeal){
            return {
                txt: ts,
                cls: cls[2]
            };
        }

        if(t <10){
            s = 0;
        }else if(t>= 10 && t<15){
            s = 1;
        }else{
            s = 2;
            if(t > 60){
                t = Math.floor(t / 60) ;
                tip = '小时';
                if(t > 24){
                    t = Math.floor(t / 24) ;
                    tip = '天';
                }
            }
        }


        return {
            txt: t + tip +'前发布',
            cls: cls[s]
        }

    },
    autoScroll:function () {
        var fn = this.option.autoScroll;
        fn && fn.apply(this);
    },

    playNext:function () {
        var fn = this.option.playNext;
        fn && fn.apply(this);
        this.autoScroll();
    },
    playPrev:function () {
        var fn = this.option.playPrev;
        fn && fn.apply(this);
        this.autoScroll();
    },
    getPlayBtn:function () {
        return this.curPlayBtn;
    },
    _initPlayer: function () {
        var self = this,
            opt = self.option;

        this.mPlayer = self.panel.find("#xmplayer");
        this.wPlayer = self.panel.find("#xmplayer2");


        this.mPlayer.jPlayer({
            ready: function (event) {
                // $(this).jPlayer("setMedia", {
                //     m4a: self.proxy.attr('data-src')
                // });
            },
            solution: "html,flash",
            swfPath: window.config.PLAYER_PATH,
            supplied: "m4a, oga",
            wmode: "window",
            autoBlur: false,
            cssSelectorAncestor: '.j-player',
            showIndicator: true,
            cssSelector: {
                play: ".jp-play",
                currentTime: ".t-start",
                duration: ".t-end",
                playBar: ".progressbar",
                seekBar: ".progress-panel",
                seekBarIndicator: ".jp-seek-indicator"
            },
            play: function () {
                $(this).jPlayer("pauseOthers");
            }
        });

        this.mPlayer.bind($.jPlayer.event.play + ".jp-play", function(event) {
            opt.onPlay && opt.onPlay.apply(self,self.getPlayBtn());

        }).bind($.jPlayer.event.pause + ".jp-pause", function(event) {
            opt.onPause && opt.onPause.apply(self,self.getPlayBtn());
        });

        this.wPlayer.jPlayer({
            ready: function (event) {
            },
            solution: "html,flash",
            swfPath: window.config.PLAYER_PATH,
            supplied: "m4a, oga",
            wmode: "window",
            autoBlur: false,
            cssSelectorAncestor: '.j-player2',
            showIndicator: true,
            cssSelector: {
                play: ".jp-play",
                currentTime: ".t-start",
                duration: ".t-end",
                playBar: ".progressbar",
                seekBar: ".progress-panel",
                seekBarIndicator: ".jp-seek-indicator"
            },
            play: function () {
                $(this).jPlayer("pauseOthers");
            }
        });

        $(window).on('unload',function(){
            self.mPlayer.jPlayer('destroy');
            self.wPlayer.jPlayer('destroy');
        });

    }


};



/*
    声音管理页面播放器
 */

function XMPlayer2(select,opt){
    this.panel = $(select);
    this.option = $.extend({

    },opt);
    this.collapsed = false;
    this._init();
}

XMPlayer2.prototype = {
    _init:function () {

        this._initElements();
        this._initPlayer();
        this.bindEvents();
    },
    bindEvents:function () {
        var self = this;

        self.swaperIndex = self.panel.find('.swiper-index');
        self.swaperTotal = self.panel.find('.swiper-total');

        self.swiper= new Swiper('.swiper-container', {
            paginationClickable: true,
            spaceBetween: 0,
            // autoplay: 5000,
            loop:false,
            nextButton: '.swiper-btn-next',
            prevButton: '.swiper-btn-prev',
            onInit: function(swp){
                self.updateSwiperNav(swp);
            },
            onSlideChangeEnd: function(swp){
                self.updateSwiperNav(swp);
            }
        });

        self.panel.find('.j-pswitch').on('click',function () {
            self.toggle();
        });

        this.prevBtn.on('click',function () {
            self.playPrev();
        });

        this.nextBtn.on('click',function () {
            self.playNext();
        });


    },
    updateSwiperNav:function(swp){
        var len = swp.slides.length;
        this.swaperIndex.html(len > 0 ? swp.activeIndex+1 : 0);
        this.swaperTotal.html(len);
    },
    hasPrev:function () {
        var fn = this.option['hasPrev'];
        return fn && fn.apply(this) || false;
    },
    hasNext:function () {
       var fn = this.option['hasNext'];
        return fn && fn.apply(this) || false;
    },
    _initElements:function () {
       var con = this.panel;
       this.titleEl = con.find('.j-player-title');
       this.userEl = con.find('.j-player-user');
       this.albumEl = con.find('.j-player-album');
       this.introEl = con.find('.j-player2-intro');
       this.prevBtn = con.find('.j-prev-btn');
       this.nextBtn = con.find('.j-next-btn');
    },
    isExpanded:function (argument) {
        return this.collapsed;
    },
    toggle:function (argument) {
        if(!this.curSoundId){
            return ;
        }
        this.collapsed = (!this.collapsed);
        this.panel.toggleClass('collapsed');
        return this;
    },
    expand:function () {
       this.collapsed = false;
       this.panel.removeClass('collapsed');
       return this;
    },
    collapse:function () {
        this.collapsed = true;
        this.panel.addClass('collapsed');
        return this;
    },
    play:function (trackInfo,pInfo) {
        var self = this,
            silent = pInfo && pInfo.silent,
            playHead = pInfo && pInfo.playHead || -1;

        // if(self.curSoundId && (self.curSoundId == trackInfo.soundId)){
        //     return this;
        // }
        self.curSoundId = trackInfo.soundId;
        self.mPlayer.jPlayer("setMedia", {
            m4a: trackInfo.src
        });
        self.curPlayBtn = trackInfo.playBtn;
        self.curDuration = trackInfo.duration;
        if(!silent){
            if(playHead > 0){
                self.mPlayer.jPlayer('play',playHead);
            }else{
                self.mPlayer.jPlayer('play');
            }
        }
        self.mPlayer.jPlayer('clearGhostLayer');

        self.setExtraInfo(trackInfo);
        self.linkBtns();
        return self;
    },
    linkBtns:function () {
        this.prevBtn.prop('disabled',!this.hasPrev());
        this.nextBtn.prop('disabled',!this.hasNext());
    },
    pause:function (info) {
        this.mPlayer.jPlayer('pause');
        return this;
    },
    setMPlayHead:function (p) {
        this.mPlayer.jPlayer('play',p || 0);
    },
    resume:function (playHead) {
        if(playHead > 0){
            this.mPlayer.jPlayer('play',playHead || 0);
        }else{
            this.mPlayer.jPlayer('play');
        }
        return this;
    },
    setExtraInfo:function (info) {
        this.titleEl.html(info.trackStr).attr('href',info.trackUrl);
        this.userEl.html(info.userStr).attr('href',info.userUrl);
        this.albumEl.html(info.albumStr).attr('href',info.albumUrl);
        this.introEl.html(info.intro || '暂无简介');
        this.updateTableData(info.detailInfo);
        this.updateSlides(info.images);
    },
    updateTableData:function(info){
        var tb = this.panel.find('.j-detail-info');

        tb.find('.j-detail-time').html(info.createdAt);
        tb.find('.j-detail-upload').html(info.isCrawler);
        tb.find('.j-detail-origin').html(info.userSource);
        tb.find('.j-detail-label').html(info.tags);
        tb.find('.j-detail-go').html(info.digStatus);
        tb.find('.j-detail-state').html(info.isPublic);
        tb.find('.j-detail-cate').html(info.category);
        tb.find('.j-detail-status').html(info.status);
    },
    updateSlides:function(imgs){
        var swp = this.swiper,
            len = imgs.length,
            i = 0;

        swp.removeAllSlides();
        while(i<len){
            swp.appendSlide('<div class="swiper-slide"><img onerror="this.remove()" src="'+ imgs[i]+'"></div>');
            i++;
        }
        swp.update();
        this.updateSwiperNav(swp);
    },
    autoScroll:function () {
        var fn = this.option.autoScroll;
        fn && fn.apply(this);
    },

    playNext:function () {
        var fn = this.option.playNext;
        fn && fn.apply(this);
        this.autoScroll();
    },
    playPrev:function () {
        var fn = this.option.playPrev;
        fn && fn.apply(this);
        this.autoScroll();
    },
    getPlayBtn:function () {
        return this.curPlayBtn;
    },
    _initPlayer: function () {
        var self = this,
            opt = self.option;

        this.mPlayer = self.panel.find("#xmplayer");

        this.mPlayer.jPlayer({
            ready: function (event) {
                // $(this).jPlayer("setMedia", {
                //     m4a: self.proxy.attr('data-src')
                // });
            },
            solution: "html,flash",
            swfPath: window.config.PLAYER_PATH,
            supplied: "m4a, oga",
            wmode: "window",
            autoBlur: false,
            cssSelectorAncestor: '.j-player',
            showIndicator: true,
            cssSelector: {
                play: ".jp-play",
                currentTime: ".t-start",
                duration: ".t-end",
                playBar: ".progressbar",
                seekBar: ".progress-panel",
                seekBarIndicator: ".jp-seek-indicator"
            },
            play: function () {
                $(this).jPlayer("pauseOthers");
            }
        });

        this.mPlayer.bind($.jPlayer.event.play + ".jp-play", function(event) {
            opt.onPlay && opt.onPlay.apply(self,self.getPlayBtn());

        }).bind($.jPlayer.event.pause + ".jp-pause", function(event) {
            opt.onPause && opt.onPause.apply(self,self.getPlayBtn());
        });

        $(window).on('unload',function(){
            self.mPlayer.jPlayer('destroy');
        });

    }


};