//generall
userid = localStorage.getItem('userid');
var badgeCount = 0;

var defaultView = 'news';
if (userid == undefined || userid == '' || userid == null) {
    defaultView = 'profile';
}
else {
    $('#offStyle').html('');
}

app = new kendo.mobile.Application(document.body, {
    platform: "ios",
    initial: defaultView
});



var MobileNumber = 'MobileNumber';
var DeviceToken = MobileNumber;
var Password = MobileNumber;

var DeviceType = 'iOS';



function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function goBack(e) {

    e.preventDefault();
    try {
        app.navigate("#:back");
    } catch (e) {

        try {
            app.navigate("home");
        }
        catch (ex
            ) {
            //return;
        }
    }
}

function getChannelindex(chan) {
    var i = 0;

    try {
        i = ChannelNames.indexOf(chan);
    }
    catch (e) {

    }

    return i;
}



function sendMail(e) {
    try {
        window.location.href = 'mailto:info@mobilenigeria.ng?subject=From MobileNigeria User&body=Hello Team MobileNigeria...';
    }
    catch (ee) { }
}

function callUs(e) {
    try {
        window.location.href = 'tel:+2348039694639';
    } catch (ee) { }
}

function asdetails(e) {
    try {
        window.open(ads_details_url, '_blank', 'location=no');
    } catch (ee) { }
}

var ChannelNames = ["MobileNigeria News", "Vanguard", "The Punch",
"The Nation", "LindaIkeji's Blog", "The Sun", "TVC News", "TheNETng", "360Nobs", "Naij.com",
"ChannelsTV News", "CNN International", "BBC Africa", "Information Nigeria", "Leadership",
"DailyPost", "PM News", "Complete Sports", "Goal.com", "TechCrunch",
"TechLoy", "OTEKBITS", "LadunLiadi's Blog", "OgbongeBlog", 'Premium Times',
"Y! Naija", "Sahara Reporters", "The Guardian", "BellaNaija", "I am Redeemed Blog"];

var ChannelIcons = ["mobilenigeria.png", "vanguard.jpg",
"punch.png", "thenation.png", "lindaikeji.jpeg", "thesun.png",
"tvc.png", "thenetng.png", "360nobs.png", "naij.png",
"channelstv.png", "cnn.png", "bbc.png", "infomationnigeria.jpeg",
"leadership.png", "dailypost.png", "pmnews.png",
"completesports.gif", "goal.jpg", "techcrunch.png", "techloy.png",
"otekbits.png", "ladunlaidi.png", "ogbongeblog.png", "premiumtimes.png",
"ynaija.png", "saharareporters.png", "guardiannews.png",
"BellaNaija-logo.png", "iamredeemed.png"];

var currentChannel = ChannelNames[0];

//menu
function getData() {
    var data = [], idx = 0;

    for (; idx < ChannelNames.length; idx++) {
        data.push({
            name: ChannelNames[idx],
            img: 'source/' + ChannelIcons[idx]
        });
    }

    return data;
}

var dataSource = new kendo.data.DataSource({
    data: getData()
    ,pageSize: 50
});

function newsInit() {
  
    $("#listView").kendoMobileListView({
        dataSource: dataSource,
        template: $("#menutemplate").text(),
        //endlessScroll: true,
        dataBound: function (e) {
            $("#listView li").each(function (index) {
                try {
                    $(this).click(function () {

                        app.navigate('#news');

                        app.showLoading();
                        currentChannel = ChannelNames[index];
                        newsDataSource.read();

                    });
                }
                catch (ex) {
                }
            });
        }

    });

    $("#twittermenu").kendoMobileListView({
        dataSource: new kendo.data.DataSource({
            data: [{ name: "@MobileNigeria", img: "img/icon.png", id: 1 },
                 { name: "Trending #MNNews", img: "img/trending-tweets.png", id: 2 }]
        }),
        template: $("#menutemplate").text(),
        click: function (e) {
           // alertmsg(e.item.context.innerText);
            if ("@MobileNigeria" == e.item.context.innerText) {
                $('#atmn').show();
                $('#hashmn').hide();
            }
            else {
                $('#atmn').hide();
                $('#hashmn').show();
            }
            app.navigate('ireport.html');
            //$("#menu").data("kendoMobileDrawer").hide();
        }

    });

    try{
        registerPush();
    }
    catch (e) {

    }
}


function storeNews() {
    try {
        var html = $("#newsList").html();

        localStorage.setItem('newsList', html);
        localStorage.setItem('currentChannel', currentChannel);
    }
    catch (dd) {

    }
}

function loadNewsFromStore() {
    try {
        var html = localStorage.getItem('newsList');
        currentChannel = localStorage.getItem('currentChannel');
        $("#newsList").html(html);
    }
    catch (dd) {

    }
}


document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    try {
        MobileNumber = device.uuid;
    }
    catch (e) {
        //alertmsg('device.uuid');
        //alertmsg(e);
    }


    try {
        DeviceType = 'iOS' + device.model + '|' + device.name;
    }
    catch (e) {
        //alertmsg('DeviceType');
        //alertmsg(e);
    }

    DeviceToken = MobileNumber;
    Password = MobileNumber;


    try {
        user_token = localStorage.getItem('user_token');
    }
    catch (sss) { };

    

}


var activePage = '';
var tabstrip = '';

function pageShow(e) {
    if (e.sender.id != undefined) {
        activePage = e.sender.id;
        activePage = activePage.replace('#', '');
        activePage = activePage.replace('.html', '');
      
        try {

            tabstrip = $("#tabStrip").data("kendoMobileTabStrip");

            tabstrip.badge(0, badgeCount);

        } catch (ee) { }
    }
}

function prevent(e) {
    if (activePage == 'news') {
        $('#listView').show();
        $('#twittermenu').hide();
        //$("#menu").data("kendoMobileDrawer").header.innerText = "sdfsfgg2";
        // $("#menu").data("kendoMobileDrawer").title('News Sources');

        $('#menu').data('title', 'News Channels');
        $('#menutitle').text('News Channels');
    }
    else if (activePage == 'ireport') {
        $('#listView').hide();
        $('#twittermenu').show();

        $('#menu').data('title', 'iShare Menu');
        $('#menutitle').text('iShare Menu');
        //$("#menu").data("kendoMobileDrawer").header.innerText = "sdfsfgg22";
    }
    else if (activePage == 'menu') {
        
    }
    else {
       // alertmsg(activePage);
        e.preventDefault();
    }
}

function alertmsg(msg) {
    try{
        navigator.notification.alert(msg);
    }
    catch (ee) { }
}


try {

    var val = localStorage.getItem('badgeCount');

    badgeCount = parseInt(val) || 0;

   // alert(badgeCount);
}
catch(i){
    badgeCount = 0;
}