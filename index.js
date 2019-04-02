var tshirtColors = [
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'LawnGreen', hex: '#7CFC00' },
  { name: 'Aqua', hex: '#00FFFF' },
  { name: 'Fuchsia', hex: '#FF00FF' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'DarkBlue', hex: '#00008B' },
  { name: 'DarkCyan', hex: '#008B8B' },
  { name: 'DarkGreen', hex: '#006400' },
  { name: 'DarkMagenta', hex: '#8B008B' },
  { name: 'DarkRed', hex: '#8B0000' },
  { name: 'DarkGoldenRod', hex: '#B8860B' },
  { name: 'DarkGray', hex: '#A9A9A9' },
  { name: 'LightGray', hex: '#D3D3D3' },
  { name: 'Black', hex: '#000000' }
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
  $('#tshirt-label').html('T-shirt color: ' + rgbToHex(tshirtColor) + ', logo color: ' + rgbToHex(logoColor) + ', top:' + logoTop + ', left:' + logoLeft + ', size:' + logoSize);

  if (history.pushState) {
    var url = window.location.protocol + '//' + window.location.host +
      window.location.pathname + '?tshirt_color=' + rgbToHex(tshirtColor) + '&logo_color=' + rgbToHex(logoColor) + '&top=' + logoTop + '&left=' + logoLeft + '&size=' + logoSize;
    history.pushState({ path:url }, '', url);
  }
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
