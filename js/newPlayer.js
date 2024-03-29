$(document).ready(function () {

    //이미지 미리 불러오기
    function preloadImages(imagelist){
        for (var i=0; i<imagelist.length; i++){
            var img = new Image();
            img.src = imagelist[i];
        }
    }

    //뮤직 플레이어 
    function newPlayer() {
        this.songs = JSON.parse(localStorage.getItem('songs'));                 //모든 곡 데이터                                                     //곡 데이터
        //this.song_id = this.suffleIdx(songs.length);                          //곡 랜덤으로 섞음
        
        //재생목록 로드
        this.playlist = JSON.parse(localStorage.getItem('playlist'));  
        this.play_id = this.playlist.length-1;                                   //재생곡 id
        for(var id = 0; id < this.playlist.length; id++){
            var playIdx = this.playlist[id];
            var songTitle = this.songs[playIdx].title;
            var substrTitle = songTitle.length > 50 ? songTitle.substring(0, 50) + "..." : songTitle;                        //재생 목록에 곡들 추가
            var playlistRow = "<div class='playlistRowArea'>"
            +"<div class='click_checkbox'><input class='checkbox' type='checkbox'></div>"
            +"<div class='playlistRow' id="+id+">"+substrTitle+"</div>" +"</div>"
            $('.playlist').append(playlistRow);
            this.playlistChangeEvent(id);   //재생목록에서 재생곡 이벤트 주기
        }
        this.playlistTitleColorChange(this.play_id);
        this.playlistDeleteBtn();                                               //재생목록 삭제버튼
        $('.playlistScroll').scrollTop($('.playlistScroll')[0].scrollHeight);   //재생목록 스크롤 마지막으로 지정
        
        //노래 로드
        this.song_id = this.playlist[this.play_id];                         //실제곡 id
        this.audio_mp3 = new Audio(this.songs[this.song_id].mp3Path);       //오디오 객체(.mp3)
        this.audio_ogg = new Audio(this.songs[this.song_id].oggPath);       //오디오 객체(.ogg)
        
        $('#song_img').attr('src', this.songs[this.song_id].imgPath);        //이미지 출력
        $('#song_title').text(this.songs[this.song_id].title);              //제목 출력



        this.togglePlayEvent();
        this.preSongChangeEvent();
        this.nextSongChangeEvent();
        this.loadedOggEvent();
        this.loadedMp3Event();
        this.timeUpdateSongEvent();
        this.endedSongEvent();
        this.repeatEvent();
        this.suffleEvent();
        this.buttonHover();


        //진행 막대 초기화
        this.p_bar = this.progressBar;
        this.p_bar.square.style.left = this.p_bar.pInner.offsetWidth - (this.p_bar.square.offsetWidth / 2) + 'px';
        this.p_bar.progressBarEvent();


        //사운드 막대 초기화
        this.s_bar = this.soundBar;
        $('.volume-sInner').css('width', '60%');                         //볼륨설정
        this.audio_ogg.volume = this.s_bar.sInner.offsetWidth / this.s_bar.sOuter.offsetWidth;
        this.s_bar.circle.style.left = this.s_bar.sInner.offsetWidth - (this.s_bar.circle.offsetWidth / 2) + 'px';
        this.s_bar.toggleSoundEvent(this.audio_ogg);
        this.s_bar.soundBarEvent(this.audio_ogg);
        this.mouseMoveEvent(this.p_bar, this.s_bar, this.audio_ogg);
        this.mouseUpEvent(this.p_bar, this.s_bar, this.audio_ogg, this.audio_mp3);

        

    }

    newPlayer.prototype = {
        song_id: 0,                                                    //곡 현재 위치 
        progressBarStop: false,                                        //진행바 정지 체크
        repeat: 1,                                                     //반복
        suffle: false,                                                 //셔플
        checkedSongs: new Set(),                                       //재생목록에서 체크표시된 곡들
        //곡 재생,정지
        togglePlayEvent: function () {
            $('.togglePlay > .circle').click(function () {
                if ($('.togglePlay label').text() == "재생") {
                    this.progressBarStop = false;
                    this.audio_ogg.play();
                    this.verticalImg();
                } else {
                    this.audio_ogg.pause();
                    this.triangleImg();
                }
            }.bind(this));
        },

        //이전곡으로 변경
        preSongChangeEvent: function () {
            $('.prePlay > .circle').click(function () {
                var prePlayIdx = this.play_id;
                if (this.suffle)     //셔플
                    this.play_id = this.suffleIdx(this.playlist.length);
                else {
                    if (this.play_id == 0)
                        this.play_id = 0;
                    else
                        this.play_id -= 1;
                }
                this.song_id = this.playlist[this.play_id];
                this.songChange(this.song_id);
                this.playlistTitleColorDefault(prePlayIdx);
                this.playlistTitleColorChange(this.play_id);
            }.bind(this));
        },

        //다음곡으로 변경
        nextSongChangeEvent: function () {
            $('.nextPlay > .circle').click(function () {
                var prePlayIdx = this.play_id;
                if (this.suffle)     //셔플
                    this.play_id = this.suffleIdx(this.playlist.length);
                else {
                    if (this.play_id < this.playlist.length - 1)
                        this.play_id += 1;
                    else
                        this.play_id = this.playlist.length - 1;
                }
                this.song_id = this.playlist[this.play_id];
                this.songChange(this.song_id);
                this.playlistTitleColorDefault(prePlayIdx);
                this.playlistTitleColorChange(this.play_id);
            }.bind(this));
        },

        //노래가 로드될 떄
        //ogg로드
        loadedOggEvent: function () {
            this.audio_ogg.addEventListener('loadeddata', function () {
                var currentTime = this.convertTime(this.audio_ogg.currentTime);
                $('#current_time').text(currentTime);
            }.bind(this));
        },
        //mp3로드
        loadedMp3Event: function(){
            this.audio_mp3.addEventListener('loadeddata',function(){
                var duration = this.convertTime(this.audio_mp3.duration);
                $('#duration').text(duration);
            }.bind(this));
        },

        //노래가 진행될 때
        timeUpdateSongEvent: function () {
            this.audio_ogg.addEventListener('timeupdate', function () {
                if (this.progressBarStop) return;
                this.p_bar.updateTimeProgressBar(this.audio_mp3.duration, this.audio_ogg.currentTime, this.convertTime);
            }.bind(this));
        },

        //노래가 끝났을 때
        endedSongEvent: function () {
            this.audio_ogg.addEventListener('ended', function () {
                var prePlayIdx = this.play_id;
                if (this.repeat == 2) {    //순환재생
                    if (this.suffle)     //셔플재생
                        this.play_id = this.suffleIdx(this.playlist.length);
                    else {
                        if (this.play_id < this.playlist.length - 1)
                            this.play_id += 1;
                        else
                            this.play_id = 0;
                    }
                    this.song_id = this.playlist[this.play_id];
                    this.suffleSongChange(this.song_id);            //순환상태 노래 변경
                    this.playlistTitleColorDefault(prePlayIdx);
                    this.playlistTitleColorChange(this.play_id);
                    this.audio_ogg.play();
                }
                else if (this.repeat == 3) {//1곡반복재생
                    this.audio_ogg.play();
                }
                else {
                    this.triangleImg();
                }
                $('#current_time').text('0:00');
                this.p_bar.updateProgressBar(this.p_bar.p_base.offsetLeft);
            }.bind(this));
        },

        //노래 변경(이미지, 제목, 오디오파일, 진행바 등)
        songChange: function (song_id) {
            var p_bar = this.p_bar;
            this.p_bar.updateProgressBar(this.p_bar.p_base.offsetLeft);
            this.progressBarStop = true;
            this.audio_ogg.pause();
            this.audio_ogg.src = null;
            this.audio_mp3.src = this.songs[song_id].mp3Path;
            this.audio_ogg.src = this.songs[song_id].oggPath;
            this.triangleImg();
            $('#song_img').attr('src', this.songs[song_id].imgPath);
            $('#song_title').text(this.songs[song_id].title);
        },
        //순환상태 노래 변경
        suffleSongChange: function (song_id) {
            var p_bar = this.p_bar;
            this.p_bar.updateProgressBar(this.p_bar.p_base.offsetLeft);
            this.audio_ogg.pause();
            this.audio_mp3.src = this.songs[song_id].mp3Path;
            this.audio_ogg.src = this.songs[song_id].oggPath;
            this.verticalImg();
            $('#song_img').attr('src', this.songs[song_id].imgPath);
            $('#song_title').text(this.songs[song_id].title);
        },

        //재생목록 색깔변경
        playlistTitleColorChange: function (playIdx) {
            document.querySelectorAll('.playlistRowArea')[playIdx].style.color='blueviolet';
        },

        //재생목록 색깔초기화
        playlistTitleColorDefault: function (playIdx) {
            document.querySelectorAll('.playlistRowArea')[playIdx].style.color="";
        },

        //재생버튼 삼각형 이미지로 변경
        triangleImg: function () {
            $('.togglePlay button').removeClass('vertical-line').addClass('right_triangle');
            $('.togglePlay label').text('재생')
        },
        //재생버튼 작대기 이미지로 변경
        verticalImg: function () {
            $('.togglePlay button').removeClass('right_triangle').addClass('vertical-line');
            $('.togglePlay label').text('정지');
        },
        //전체 mousemove
        mouseMoveEvent: function (progressBar, soundBar, audio_ogg) {
            document.addEventListener('mousemove', function (e) {
                if (soundBar.s_drag) {
                    soundBar.updateSoundBar(e.clientX, audio_ogg);
                }
                if (progressBar.p_drag) {
                    progressBar.p_mousedown = true;
                    progressBar.updateProgressBar(e.clientX);
                }
            });
        },

        //전체 mouseup
        mouseUpEvent: function (progressBar, soundBar, audio_ogg, audio_mp3) {
            document.addEventListener('mouseup', function (e) {
                soundBar.s_drag = false;
                if (progressBar.p_mousedown) {
                    if (audio_ogg.currentTime == 0) {
                        audio_ogg.load();
                    };
                    audio_ogg.currentTime = progressBar.currentPercentage(e.clientX, audio_mp3);
                    if ($('.togglePlay label').text() == "정지") {
                        audio_ogg.play();
                    }

                }
                progressBar.p_drag = false;
                progressBar.p_mousedown = false;
            });
        },

        //반복 버튼
        repeatEvent: function () {
            $('.repeat').click(function (e) {
                if (this.repeat == 1) {
                    e.target.src = "/img/repeat_on.png";
                    this.repeat = 2;
                }
                else if (this.repeat == 2) {
                    e.target.src = "/img/repeat_one.png";
                    this.repeat = 3;
                }
                else {
                    e.target.src = "/img/repeat_off.png";
                    this.repeat = 1;
                }
            }.bind(this));
        },

        //셔플 버튼
        suffleEvent: function () {
            $('.suffle').click(function (e) {
                if (this.suffle) {
                    e.target.src = "/img/suffle_off.png";
                    this.suffle = false;
                }
                else {
                    e.target.src = "/img/suffle_on.png";
                    this.suffle = true;
                }
            }.bind(this));
        },


        //진행막대
        progressBar: {
            p_base: document.querySelector('.progress_base'),
            pInner: document.querySelector('.progress_bar'),
            square: document.querySelector('.progress-square'),
            p_drag: false,
            p_mousedown: false,
            current_time: document.querySelector('#current_time'),

            //진행 막대 업데이트
            updateProgressBar: function (x) {
                var position = x - this.p_base.offsetLeft;
                var percentage = 100 * position / this.p_base.clientWidth;
                if (percentage < 0) {
                    percentage = 0;
                }
                if (percentage > 100) {
                    percentage = 100;
                }
                if (position < 0) {
                    position = 0
                }
                if (position > this.p_base.clientWidth) {
                    position = this.p_base.clientWidth;
                }
                this.pInner.style.width = percentage + "%";
                this.square.style.left = position - (this.square.offsetWidth / 2) + "px";
            },

            //진행 막대 시간 및 상황 
            updateTimeProgressBar: function (duration, currentTime, convertTime) {
                if (this.p_mousedown) {
                    //console.log('정지');
                }
                else {
                    this.current_time.innerHTML = convertTime(currentTime);
                    var percentage = currentTime / duration;
                    var progress = this.p_base.offsetWidth * percentage;
                    this.pInner.style.width = progress + "px";
                    this.square.style.left = progress - (this.square.offsetWidth / 2) + "px";
                }
            },

            //진행 막대 mousedown
            progressBarEvent: function () {
                this.p_base.addEventListener('mousedown', function (e) {
                    this.p_drag = true;
                    this.p_mousedown = true;
                    this.updateProgressBar(e.clientX);
                }.bind(this));
            },

            //현재 진행바 퍼센트
            currentPercentage: function (x, audio_mp3) {
                var position = x - this.p_base.offsetLeft;
                var percentage = position / this.p_base.clientWidth;
                if (percentage < 0) {
                    percentage = 0;
                }
                if (percentage > 1) {
                    return 1 * audio_mp3.duration - 0.1;
                }
                return percentage * audio_mp3.duration;
            },
        },

        //사운드 막대
        soundBar: {
            sOuter: document.querySelector('.volume-sOuter'),
            sInner: document.querySelector('.volume-sInner'),
            circle: document.querySelector('.volume-circle'),
            s_drag: false,
            mute: false,                                                  //뮤트
            currentVolume: 0,
            currentWidth: 0,
            currentLeft: 0,
            updateSoundBar: function (x, audio_ogg) {
                var percentage;
                var position = x - this.sOuter.offsetLeft;
                percentage = 100 * position / this.sOuter.clientWidth;
                //막대
                if (percentage > 100) {
                    percentage = 100;
                }
                if (percentage < 0) {
                    percentage = 0;
                }
                //원
                if (position < 0) {
                    position = 0;
                }
                if (position > this.sOuter.clientWidth) {
                    position = this.sOuter.clientWidth;
                }


                //사운드바 움직일 때 사운드 이미지 처리
                if(percentage <= 0 && this.mute == false){
                    this.mute = true;
                    $('.sound').attr('src','/img/mute.png');
                }
                if(percentage > 0 && this.mute == true){
                    this.mute = false;
                    $('.sound').attr('src','/img/sound.png');
                }
                

                this.sInner.style.width = percentage + '%';
                this.circle.style.left = position - (this.circle.offsetWidth / 2) + 'px';
                audio_ogg.volume = percentage / 100;

            },

            //사운드 on/off
            toggleSoundEvent: function (audio_ogg) {
                $('.sound').click(function (e) {
                    if (this.mute) {
                        e.target.src = "/img/sound.png";
                        this.mute = false;
                        audio_ogg.volume = this.currentVolume;
                        this.sInner.style.width = this.currentWidth;
                        this.circle.style.left = this.currentLeft;
                    } else {
                        e.target.src = "/img/mute.png";
                        this.mute = true;
                        this.currentVolume = audio_ogg.volume;
                        this.currentWidth = audio_ogg.volume * 100 + "%";
                        this.currentLeft = this.sInner.offsetWidth - (this.circle.offsetWidth / 2) + 'px';
                        audio_ogg.volume = 0;
                        this.sInner.style.width = 0;
                        this.circle.style.left = - (this.circle.offsetWidth / 2) + 'px';
                    }

                }.bind(this));

            },

            //사운드 막대 mousedown
            soundBarEvent: function (audio_ogg) {
                this.sOuter.addEventListener('mousedown', function (e) {
                    this.s_drag = true;
                    this.updateSoundBar(e.clientX, audio_ogg);
                }.bind(this));
            }

        },

        //셔플된 인덱스
        suffleIdx: function (length) {
            if (length == 0) return this.song_id;
            var idx;
            while (true) {
                idx = Math.floor(Math.random() * length);
                if (idx != this.song_id)
                    return idx;
            }
        },

        //sec 변환
        convertTime: function (time) {
            min = Math.floor(time / 60);
            sec = Math.floor(time % 60);
            if (sec < 10)
                sec = "0" + sec;
            result = min + ":" + sec;
            return result;
        },

        //play,pre,next버튼 hover
        buttonHover: function () {
            $('.circle').hover(function (e) {
                var triangleNode = e.target.previousElementSibling;
                var triangleNodeClassName = triangleNode.className;
                var circleNode = e.target;
                var straightNode = triangleNode.previousElementSibling;
                if (straightNode.className == "left_straight" || straightNode.className == "right_straight") straightNode.style.borderColor = "blueviolet";
                if (triangleNodeClassName == "left_triangle") triangleNode.style.borderColor = "#fff blueviolet #fff #fff";
                else triangleNode.style.borderColor = "#fff #fff #fff blueviolet";
                circleNode.style.borderColor = "blueviolet";

            }, function (e) {
                var triangleNode = e.target.previousElementSibling;
                var triangleNodeClassName = triangleNode.className;
                var circleNode = e.target;
                var straightNode = triangleNode.previousElementSibling;
                if (straightNode.className == "left_straight" || straightNode.className == "right_straight") straightNode.style.borderColor = "gray";
                if (triangleNodeClassName == "left_triangle") triangleNode.style.borderColor = "#fff gray #fff #fff";
                else triangleNode.style.borderColor = "#fff #fff #fff gray";
                circleNode.style.borderColor = "gray";

            });
        },
        
        
        //재생곡 변경 이벤트
        playlistChangeEvent: function (id) {
            $('.playlistRow').get(id).addEventListener("click", function (e) {
                var playlistRows = document.querySelectorAll('.playlistRow');
                var index;
                for(var i=0;i<playlistRows.length;i++){
                    if (playlistRows[i]===e.target){
                        index = i;
                    }
                }
                
                var prePlayIdx = this.play_id;
                var newPlayIdx = index;
                var song_id = this.playlist[newPlayIdx];
              
                if (prePlayIdx < playlistRows.length)
                    this.playlistTitleColorDefault(prePlayIdx);
                this.songChange(song_id);
                this.playlistTitleColorChange(newPlayIdx);
                this.play_id = newPlayIdx;
            }.bind(this));
        },
        //재생목록 삭제 버튼 
        playlistDeleteBtn: function(){
            $('#deleteBtn').on("click", function(){//체크된 곡들 삭제
                var isCheckedBox = $('.checkbox').is(":checked");   
                if (isCheckedBox){
                    var checkedSongs = [] //playlist내에 제거대상요소
                    var checkedElements = $('.checkbox:checked');
                    for(var i=0;i<checkedElements.length;i++){
                        checkedIdx = checkedElements[i]
                                    .parentElement
                                    .nextSibling
                                    .getAttribute("id");
                        checkedSongs.push(Number(checkedIdx));
                        checkedElements[i].parentElement.parentElement.remove();    //태그 요소 제거
                    }

                    
                    //재생목록에서 역순으로 제거후 localstorage에 저장
                    checkedSongs = checkedSongs.reverse();
                    for(let idx of checkedSongs)                               //역순으로 해당 곡들 제거 
                        this.playlist.splice(idx,1);                           //태그요소제거
                    
                    localStorage.setItem('playlist', JSON.stringify(this.playlist)); //plsylist도 요소 제거 
                    
                }

            }.bind(this));
        
        }
        
    }



    /*  
        1. 진행 막대 현재위치에서 재생시간 변경 오류
        크롬에서 mp3파일 currentTime값을 변경할려는 경우 0으로 초기화됨  duration값은 잘 얻어옴
        크롬에서 ogg파일 currentTime값을 변경은 문제없지만 duration값을 얻어오지못함..(infinity-NaN)
        크롬에서 ogg파일의 duration값을 못얻음.. mp3파일은 얻을수 있음
        IE에서는 mp3의 currentTime값 변경해도 문제없지만 ogg파일 및 duration 지원안함..

        2. 오디오 파일 로드 지연오류
        //재생 > 이전,다음 > 재생 버튼을 반복해서 빠르게 눌렀을때 ogg오디오파일이 로드가 지연되는 오류가 발생하여
        로드 되지않은채 재생 버튼을 누를 경우 오류가 발생한다.
        해결방안 : 재생버튼을 눌렀을때 다음, 이전의 재생곡을 미리 로드하여 대기열을 구성한다.

        3.로딩 처리해야함


    */

    //이미지 미리 불러오기
    preloadImages([
        '/img/repeat_on.png',
        '/img/repeat_one.png',
        '/img/repeat_off.png',
        '/img/suffle_on.png',
        '/img/suffle_off.png',
        '/img/mute.png',
        '/img/sound.png',
    ]);
    new newPlayer();   //뮤직 플레이어 생성


});