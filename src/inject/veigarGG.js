
(function ($) {

    var self = {
        veigarGGImg: [
            'https://leagueoflegends.fandom.com/pt-br/wiki/Veigar/SkinsCuriosidades?file=Veigar%20OriginalSkin.jpg',
            'http://i49.tinypic.com/3134qj6.jpghttps://i.ytimg.com/vi/xINMB8ZBndg/maxresdefault.jpg',
            'https://data.1freewallpapers.com/download/league-of-legends-veigar.jpg',
            'http://tophdimgs.com/data_images/wallpapers/41/465824-veigar.jpg',
            'http://orig07.deviantart.net/90e8/f/2012/358/6/3/space_veigar_by_racoonwolf-d5p2h4i.jpg',
            'https://www.orduh.com/wp-content/uploads/2017/11/Veigar-Counters-Who-Counters-Veigar.jpg',
            'http://www.leaguesplash.com/wp-content/uploads/2013/09/Bad-Santa-Veigar.jpg',
            'https://gamepedia.cursecdn.com/lolesports_gamepedia_en/d/d2/Veigar_concept_7.jpg',
            'https://i.redd.it/86xfn2elz2521.jpg',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.veigarGGImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
