function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function closeNavEsc(event) {
  if (event.keyCode == 113) {
    // 'q' is keyCode 113.
    closeNav();
  }
}

i=500;
function addCircle() {
  shape = "<div id='css_circle' class='resize-empty' style='position:absolute;\
  right:"+i+"px;top:"+i/2+"px'></div>"
  document.getElementById("body").innerHTML += shape;
  // i+=10;
}
function addRectangle() {
  shape = "<div id='css_rectangle' class='resize-empty' style='position:absolute;\
  right:"+i+"px;top:"+i/2+"px'></div>"
  document.getElementById("body").innerHTML += shape;
  // i+=10;

}
function addPlainRec() {
  shape = "<div id='css_plain_rec' class='resize-plain' style='position:absolute;\
  right:"+i+"px;top:"+i/2+"px'></div>"
  document.getElementById("body").innerHTML += shape;
  // i+=10;
}
function addPlainCircle() {
  shape = "<div id='css_plain_circle' class='resize-plain' style='position:absolute;\
  right:"+i+"px;top:"+i/2+"px'></div>"
  document.getElementById("body").innerHTML += shape;
  // i+=10;
}

interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    // var textEl = event.target.querySelector('p');

    // textEl && (textEl.textContent =
    //   'moved a distance of '
    //   + (Math.sqrt(event.dx * event.dx +
    //                event.dy * event.dy)|0) + 'px');
  }
});

function dragMoveListener (event) {
  var target = event.target,
  // keep the dragged position in the data-x/data-y attributes
  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
  'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

interact('.resize-empty')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width-2*50 + 'px';
    target.style.height = event.rect.height-2*50 + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.right;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  });

interact('.resize-plain')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.right;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  })
  // .on('hold', function (event) {
  //    event.currentTarget.classList.toggle('switch-color');
  // })
;
