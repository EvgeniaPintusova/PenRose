function Sim(sldrId, items) {
  let id = document.getElementById(sldrId);
  if (id) {
    this.sldrRoot = id;
  } else {
    this.sldrRoot = document.querySelector(".sim_slider");
  }

  this.sldrList = this.sldrRoot.querySelector(".sim_slider_list");
  this.sldrElements = this.sldrList.querySelectorAll(".sim_slider_element");
  this.sldrElemFirst = this.sldrList.querySelector(".sim_slider_element");
  this.leftArrow = this.sldrRoot.querySelector("div.sim_slider_arrow_left");
  this.rightArrow = this.sldrRoot.querySelector("div.sim_slider_arrow_right");
  this.indicatorDots = this.sldrRoot.querySelector("div.sim_slider_dots");

  this.options = Sim.defaults;
  Sim.initialize(this);
}

Sim.defaults = {
  arrows: true,
  dots: true,
};

Sim.prototype.elemPrev = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  if (!this.options.loop) {
    if (this.currentElement == 0) {
      this.leftArrow.style.display = "none";
    }
    this.rightArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.elemNext = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  if (!this.options.loop) {
    if (this.currentElement == this.elemCount - 1) {
      this.rightArrow.style.display = "none";
    }
    this.leftArrow.style.display = "block";
  }

  this.sldrElements[this.currentElement].style.opacity = "1";
  this.sldrElements[prevElement].style.opacity = "0";

  if (this.options.dots) {
    this.dotOn(prevElement);
    this.dotOff(this.currentElement);
  }
};

Sim.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:var(--color-light-grey); cursor:pointer;";
};

Sim.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#fff; cursor:default;";
};

Sim.initialize = function (that) {
  that.elemCount = that.sldrElements.length;

  that.currentElement = 0;
  let bgTime = getTime();

  function getTime() {
    return new Date().getTime();
  }

  if (that.elemCount <= 1) {
    that.options.auto = false;
    that.options.arrows = false;
    that.options.dots = false;
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }
  if (that.elemCount >= 1) {
    that.sldrElemFirst.style.opacity = "1";
  }

  if (!that.options.loop) {
    that.leftArrow.style.display = "none";
    that.options.auto = false;
  }
  if (that.options.arrows) {
    that.leftArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemPrev();
        }
      },
      false
    );
    that.rightArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
          bgTime = fnTime;
          that.elemNext();
        }
      },
      false
    );
  } else {
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }

  if (that.options.dots) {
    let sum = "",
      diffNum;
    for (let i = 0; i < that.elemCount; i++) {
      sum += '<span class="sim_dot"></span>';
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.sldrRoot.querySelectorAll("span.sim_dot");

    for (let n = 0; n < that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener(
        "click",
        function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
        },
        false
      );
    }
    that.dotOff(0);
    for (let i = 1; i < that.elemCount; i++) {
      that.dotOn(i);
    }
  }
};
setTimeout(() => new Sim(), 2000);
