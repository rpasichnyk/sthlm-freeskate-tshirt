var tshirtColors = [
  { name: 'Bright red', hex: '#da160a' },
  { name: 'Burgundy', hex: '#6a2631' },
  { name: 'Candy pink', hex: '#f3dfd8' },
  { name: 'Chocolate', hex: '#43362e' },
  { name: 'Citadel blue', hex: '#87a0a5' },
  { name: 'Cream heather grey', hex: '#e4e3e1' },
  { name: 'Dark heather blue', hex: '#46566f' },
  { name: 'Dark heather denim', hex: '#223f4d' },
  { name: 'Dark heather grey', hex: '#313234' },
  { name: 'Dark heather indigo', hex: '#4c5b80' },
  { name: 'Deep royal blue', hex: '#024d9e' },
  { name: 'Fresh green', hex: '#01a245' },
  { name: 'Golden yellow', hex: '#f7d100' },
  { name: 'Heather ash', hex: '#efefef' },
  { name: 'Heather grape red', hex: '#4c2b34' },
  { name: 'Heather gray', hex: '#c9c9c9' },
  { name: 'Heather grape red', hex: '#a4b6bc' },
  { name: 'Heather ice blue', hex: '#4c2b34' },
  { name: 'Heather scarab green', hex: '#123026' },
  { name: 'Khaki', hex: '#54554d' },
  { name: 'Light opaline', hex: '#d3d4cc' },
  { name: 'Mid heater blue', hex: '#5f82a9' },
  { name: 'Mid heater green', hex: '#74b1a2' },
  { name: 'Mid heater grey', hex: '#9b9b9d' },
  { name: 'Mid heater khaki', hex: '#797e6a' },
  { name: 'Mid heater red', hex: '#db5d60' },
  { name: 'Natural', hex: '#efe7dc' },
  { name: 'Navy', hex: '#203344' },
  { name: 'Ocean depth', hex: '#005b6d' },
  { name: 'Plum', hex: '#4a4059' },
  { name: 'Red', hex: '#c8202d' },
  { name: 'Blue', hex: '#00639e' },
  { name: 'Scarab green', hex: '#1e3c30' },
  { name: 'Sky blue', hex: '#a7c7d6' },
  { name: 'Spectra yellow', hex: '#fbb61d' },
  { name: 'Stargazer', hex: '#245460' },
  { name: 'White', hex: '#eeeef0' },
  { name: 'Vintage white', hex: '#f1ece8' },
  { name: 'Antracite', hex: '#4b5151' },
  { name: 'Azur', hex: '#0181b2' },
  { name: 'Black', hex: '#1f292a' },
  { name: 'Black heater cranbarry', hex: '#835c5d' },
  { name: 'Black heather denim', hex: '#292e32' },
  { name: 'Bottle green', hex: '#295848' },
  { name: 'Bright orange', hex: '#ff660e' }
];

var logoColors = [
  { name: 'Red', hex: '#F1453D' },
  { name: 'Blue', hex: '#2B98F0' },
  { name: 'LightGreen', hex: '#8CC152' },
  { name: 'DeepOrange', hex: '#FC5830' },
  { name: 'Pink', hex: '#E62565' },
  { name: 'LightBlue', hex: '#1DA6EB' },
  { name: 'Lime', hex: '#CDDA49' },
  { name: 'Brown', hex: '#785549' },
  { name: 'Purple', hex: '#992EAC' },
  { name: 'Cyan', hex: '#1FBCD2' },
  { name: 'Yellow', hex: '#FEE94E' },
  { name: 'Grey', hex: '#9E9E9E' },
  { name: 'DeepPurple', hex: '#603BA7' },
  { name: 'Teal', hex: '#159487' },
  { name: 'Amber', hex: '#FCBF2F' },
  { name: 'BlueGrey', hex: '#617D8A' },
  { name: 'Indigo', hex: '#4054B2' },
  { name: 'Green', hex: '#50AE55' },
  { name: 'Orange', hex: '#FD9727' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
];

function rgbToHex(col) {
  if(col.charAt(0)=='r') {
      col=col.replace('rgb(','').replace(')','').split(',');
      var r=parseInt(col[0], 10).toString(16);
      var g=parseInt(col[1], 10).toString(16);
      var b=parseInt(col[2], 10).toString(16);
      r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
      var colHex='#'+r+g+b;
      return colHex;
  } else {
    return col;
  }
}

function humanReadableColor(hex) {
  for (var i = 0; i < tshirtColors.length; i++) {
    if (tshirtColors[i].hex.toLowerCase() == hex.toLowerCase()) {
      return tshirtColors[i].name;
    }
  }

  for (var i = 0; i < logoColors.length; i++) {
    if (logoColors[i].hex.toLowerCase() == hex.toLowerCase()) {
      return logoColors[i].name;
    }
  }

  return '-';
}

var tshirtColor = "";
var logoColor = "";
var logoTop = 0;
var logoLeft = 0;
var logoSize = 0;

function grabPosition() {
  logoTop = ($('#logo').offset().top - $('#tshirt-container').offset().top);
  logoLeft = $('#logo').offset().left;
}

function applyPosition() {
  $('#logo').offset({top: $('#tshirt-container').offset().top + logoTop, left: logoLeft});
}

function grabSize() {
  logoSize = $('#logo').width();
}

function applySize() {
  $('#logo').width(logoSize);
  $('#logo').height(logoSize);
}

function applyTshirtColor() {
  $('#tshirt').css('background-color', rgbToHex(tshirtColor));
}

function applyLogoColor() {
  $('path').css('fill', rgbToHex(logoColor));
}

function init() {
  $('#logo').draggable({
    stop: function(e, ui) {
      grabPosition();
      updateText();
    }
  }).resizable({
    aspectRatio: 1.0,
    stop: function(e, ui) {
      grabSize();
      updateText();
    }
  });

  logoTop = parseInt(urlParam('top'));
  logoLeft = parseInt(urlParam('left'));
  logoSize = parseInt(urlParam('size'));
  tshirtColor = urlParam('tshirt_color');
  logoColor = urlParam('logo_color');

  if (!logoTop || !logoLeft) {
    logoTop = 242;
    logoLeft = 377;
  }
  applyPosition();

  if (!logoSize) {
    logoSize = 298;
  }
  applySize();

  if (!tshirtColor) {
    tshirtColor = tshirtColors[8].hex;
  }
  applyTshirtColor();

  if (!logoColor) {
    logoColor = logoColors[10].hex;
  }
  applyLogoColor();

  updateText();
}

function urlParam(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateText() {
  const tshirtHex = rgbToHex(tshirtColor);
  const logoHex = rgbToHex(logoColor);
  $('#tshirt-label').html('<a href="http://gronatryck.se/butik/ekologiska-t-shirts/ekologisk-profilt-shirt-i-39-olika-farger-i-xs-xxxl">T-shirt color:</a> ' +
    tshirtHex + '(' + humanReadableColor(tshirtHex) + ')' +
    ', logo color: ' + logoHex + '(' + humanReadableColor(logoHex) + ')' +
    ', top:' + logoTop + ', left:' + logoLeft + ', size:' + logoSize);

  var url = window.location.protocol + '//' + window.location.host +
    window.location.pathname + '?tshirt_color=' + tshirtHex + '&logo_color=' + logoHex + '&top=' + logoTop + '&left=' + logoLeft + '&size=' + logoSize;
  history.pushState({ path:url }, '', url);

  var qrcode = document.getElementById('qrcode');
  while (qrcode.firstChild) {
    qrcode.removeChild(qrcode.firstChild);
  }

  $('#qrcode').qrcode({
    text: url,
    render: "table",
    width: 256,
    height: 256
  });
}

$(document).ready(function() {
  init();

  var $palette = $('#tshirt-color-container');
  for (var i = 0; i < tshirtColors.length; i++) {
    $palette.append($('<li />').css('background-color', tshirtColors[i].hex));
  }

  $('#tshirt-color-container').on('click', 'li', function() {
    tshirtColor = $(this).css('background-color');
    applyTshirtColor();
    updateText();
  });

  var $palette = $('#logo-color-container');
  for (var i = 0; i < logoColors.length; i++) {
    $palette.append($('<li />').css('background-color', logoColors[i].hex));
  }

  $('#logo-color-container').on('click', 'li', function() {
    logoColor = $(this).css('background-color');
    applyLogoColor();
    updateText();
  });
});
