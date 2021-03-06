$(document).ready(function () {
    var songs = [
        {
            id: 0,
            title: '먼데이키드 - 모르시죠 (Romantic Dr. Teacher Kim OST Part. 7)',
            oggPath: '/mp3/MondayKiz-YouDontKnow.ogg',
            mp3Path: '/mp3/MondayKiz-YouDontKnow.mp3',
            imgPath: '/songimg/v.jpg'
        },
        {
            id: 1,
            title: '임재현 - 사랑에 연습이 있었다면',
            oggPath: '/mp3/JaehyunLim-If_love_had_practice.ogg',
            mp3Path: '/mp3/JaehyunLim-If_love_had_practice.mp3',
            imgPath: '/songimg/u.jpg'
        },
        {
            id: 2,
            title: '송하예 - 니 소식',
            oggPath: '/mp3/SongHaYe-Your_news.ogg',
            mp3Path: '/mp3/SongHaYe-Your_news.mp3',
            imgPath: '/songimg/t.jpg'
        },
        {
            id: 3,
            title: '블랙핑크 - ForeverYoung',
            oggPath: '/mp3/BLACKPINK-FOREVER_YOUNG.ogg',
            mp3Path: '/mp3/BLACKPINK-FOREVER_YOUNG.mp3',
            imgPath: '/songimg/s.jpg'
        },
        {
            id: 4,
            title: '다이나믹 듀오 - 맵고짜고단거 (Feat. 페노메코)',
            oggPath: '/mp3/DynamicDuo-SpicyAndSweet.ogg',
            mp3Path: '/mp3/DynamicDuo-SpicyAndSweet.mp3',
            imgPath: '/songimg/r.jpg'
        },
        {
            id: 5,
            title: '아이즈원 - FIESTA',
            oggPath: '/mp3/IZONE-FIESTA.ogg',
            mp3Path: '/mp3/IZONE-FIESTA.mp3',
            imgPath: '/songimg/q.jpg'
        },
        {
            id: 6,
            title: '아이유 - Blueming',
            oggPath: '/mp3/IU-Blueming.ogg',
            mp3Path: '/mp3/IU-Blueming.mp3',
            imgPath: '/songimg/o.jpg'
        },
        {
            id: 7,
            title: '마마무 - HIP',
            oggPath: '/mp3/MAMAMOO-HIP.ogg',
            mp3Path: '/mp3/MAMAMOO-HIP.mp3',
            imgPath: '/songimg/n.jpg'
        },
        {
            id: 8,
            title: '브레이브걸스 - Rollin',
            oggPath: '/mp3/BraveGirls-Rollin.ogg',
            mp3Path: '/mp3/BraveGirls-Rollin.mp3',
            imgPath: '/songimg/m.jpg'
        },
        {
            id: 9,
            title: '기리보이(GIRIBOY) - 아퍼 (Feat. Kid Milli, Lil tachi, 김승민, NO:EL, C JAMM)',
            oggPath: '/mp3/Giriboy-Sick.ogg',
            mp3Path: '/mp3/Giriboy-Sick.mp3',
            imgPath: '/songimg/l.jpg'
        },
        {
            id: 10,
            title: '박혜원 - 시든 꽃에 물을 주듯',
            oggPath: '/mp3/TheLonelyBloomStandsAlone.ogg',
            mp3Path: '/mp3/TheLonelyBloomStandsAlone.mp3',
            imgPath: '/songimg/k.jpg'
        },
        {
            id: 11,
            title: '10cm - 나의 어깨에 기대어요',
            oggPath: '/mp3/Lean_on_my_shoulder.ogg',
            mp3Path: '/mp3/Lean_on_my_shoulder.mp3',
            imgPath: '/songimg/j.jpg'
        },
        {
            id: 12,
            title: 'AOA - 너나 해',
            oggPath: '/mp3/You_do_it.ogg',
            mp3Path: '/mp3/You_do_it.mp3',
            imgPath: '/songimg/g.jpg'
        },
        {
            id: 13,
            title: '볼빨간사춘기(BOL4) - 워커홀릭',
            oggPath: '/mp3/Walkerholic.ogg',
            mp3Path: '/mp3/Walkerholic.mp3',
            imgPath: '/songimg/i.jpg'
        },
        {
            id: 14,
            title: '황인욱 - 포장마차',
            oggPath: '/mp3/snack_cart.ogg',
            mp3Path: '/mp3/snack_cart.mp3',
            imgPath: '/songimg/h.jpg'
        },
        {
            id: 15,
            title: '거미 - 기억해줘요 내 모든 날과 그때를',
            oggPath: '/mp3/gummy-Remember_Me.ogg',
            mp3Path: '/mp3/gummy-Remember_Me.mp3',
            imgPath: '/songimg/a.jpg'
        },
        {
            id: 16,
            title: '헤이즈 (HEIZE) - We don`t talk together(Feat. 기리보이)',
            oggPath: '/mp3/heize-We_dont_talk_together.ogg',
            mp3Path: '/mp3/heize-We_dont_talk_together.mp3',
            imgPath: '/songimg/b.jpg'
        },
        {
            id: 17,
            title: '박재범 - All I Wanna Do (K) (Feat. Hoody, Loco)',
            oggPath: '/mp3/JayPark_AllIWannaDo.ogg',
            mp3Path: '/mp3/JayPark_AllIWannaDo.mp3',
            imgPath: '/songimg/c.jpg'
        },
        {
            id: 18,
            title: '모모랜드 - 뿜뿜',
            oggPath: '/mp3/MOMOLAND-BBoomBBoom.ogg',
            mp3Path: '/mp3/MOMOLAND-BBoomBBoom.mp3',
            imgPath: '/songimg/d.jpg'
        },
        {
            id: 19,
            title: '선미 - 주인공',
            oggPath: '/mp3/Sunmi_Heroine.ogg',
            mp3Path: '/mp3/Sunmi_Heroine.mp3',
            imgPath: '/songimg/e.jpg'
        },
        {
            id: 20,
            title: '환희 (Hwanhee) - 바람이 되어서라도',
            oggPath: '/mp3/Hwanhee-Eveninthewind.ogg',
            mp3Path: '/mp3/Hwanhee-Eveninthewind.mp3',
            imgPath: '/songimg/f.jpg'
        },
        {
            id: 21,
            title: '노을 - 늦은 밤 너의 집 앞 골목길에서',
            oggPath: '/mp3/noeul-GlowInTheAlleysInFrontOfYourHouseLateAtNight.ogg',
            mp3Path: '/mp3/noeul-GlowInTheAlleysInFrontOfYourHouseLateAtNight.mp3',
            imgPath: '/songimg/p.jpg'
        },
        {
            id: 22,
            title: 'K/DA - POP/STARS (feat. Madison Beer, (G)I-DLE, Jaira Burns)',
            oggPath: '/mp3/girl_idle-POPSTARS.ogg',
            mp3Path: '/mp3/girl_idle-POPSTARS.mp3',
            imgPath: '/songimg/w.jpg'
        }
    ];

    function musicChart(songs) {
        this.songs = songs;
        this.musicChartList(); //뮤직차트 목록
        this.addSongEvent(); //뮤직 플레이어에 노래추가
    };

    musicChart.prototype = {
        pop: undefined ,
        //뮤직차트목록
        musicChartList: function () {
            for (var song_id = 0; song_id < this.songs.length; song_id++) {
                var songTitle = this.songs[song_id].title;
                var substrTitle = songTitle.length > 50 ? songTitle.substring(0, 50) + "..." : songTitle;
                var musicChartRow = "<li class='musicChartRow' id=" + song_id + ">"+substrTitle+"</li>";
                $('.musicChart').append(musicChartRow);
            }
        },
        //뮤직 플레이어에 노래추가
        addSongEvent: function () {
            $('.musicChart > li').on("click", function (e) {
                var song_id = Number(e.target.id);
                var songTitle = this.songs[song_id].title;
                var substrTitle = songTitle.length > 50 ? songTitle.substring(0, 50) + "..." : songTitle;
                if (confirm("재생목록에 추가 하시겠습니까?")) {
                    var playlist = [];
                    if (localStorage.getItem('playlist')!=null){
                        playlist = JSON.parse(localStorage.getItem('playlist'));
                    }
                    playlist.push(song_id);
                    localStorage.setItem('playlist', JSON.stringify(playlist));
                    this.pop = this.openPopUp(this.pop);
                }
            }.bind(this));
        },
        //팝업창 열기
        openPopUp : function (pop) {
            if (pop == undefined) {
                pop = window.open('newPlayer', '', 'width=410,height=530');
                if (JSON.parse(localStorage.getItem('songs'))==null){
                    localStorage.setItem('songs', JSON.stringify(this.songs));   //모든 곡 데이터 로컬스토리지에 저장
                }
                var checkPopUp = setInterval(function(){ 
                    if (pop.closed){    //팝업창 닫힘
                        this.pop = undefined;
                        clearInterval(checkPopUp);
                    }
                }.bind(this),500);
            }
            else //팝업창이 열려있을 때
            {
                pop.location.reload();  //팝업창 새로고침
            }
            return pop;
        }
    };

    //뮤직차트 생성
    new musicChart(songs);

});