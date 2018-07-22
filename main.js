(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\">\n\n  <div class=\"stage-container\">\n    <app-stage\n      [width]=\"500\"\n      [height]=\"500\"\n\n      [drawables]=\"particles\"\n    ></app-stage>\n\n    <svg [attr.width]=\"500\" [attr.height]=\"500\">\n      <g\n        app-emitter-renderer\n        *ngFor=\"let emitter of emitters\"\n        [emitter]=\"emitter\"\n        (click)=\"onEmitterClick(emitter)\"\n      ></g>\n      <g\n        app-attractor-renderer\n        *ngFor=\"let attractor of attractors\"\n        [attractor]=\"attractor\"\n        (click)=\"onAttractorClick(attractor)\"\n      ></g>\n    </svg>\n    <div class=\"particles-count\">{{particles.length}} particles</div>\n  </div>\n\n  <app-emitter-detail *ngIf=\"selectedEmitter\" [emitter]=\"selectedEmitter\"></app-emitter-detail>\n  <app-attractor-detail *ngIf=\"selectedAttractor\" [attractor]=\"selectedAttractor\"></app-attractor-detail>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app {\n  display: flex; }\n  .app .stage-container {\n    flex: none; }\n  .app .stage-container svg {\n      border: 1px solid transparent;\n      position: absolute;\n      top: 0;\n      left: 0; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/index */ "./src/models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(location) {
        var _this = this;
        this.emitters = [];
        this.attractors = [];
        this.particles = [];
        this.leaps = 1;
        this.counter = 0;
        this.startUpdate = function () {
            if (_this.counter % _this.leaps === 0) {
                _this.update();
            }
            _this.counter++;
            requestAnimationFrame(_this.startUpdate);
        };
        this.location = location;
    }
    AppComponent.prototype.ngOnChanges = function () {
        var o = {
            emitters: this.emitters.map(function (e) { return e.toJS(); }),
            attractors: this.attractors.map(function (a) { return a.toJS(); }),
        };
        console.log(JSON.stringify(o));
    };
    AppComponent.prototype.ngOnInit = function () {
        this.emitters = [
            new _models_index__WEBPACK_IMPORTED_MODULE_2__["Emitter"]({
                position: new _models_index__WEBPACK_IMPORTED_MODULE_2__["Vector"]({ x: 150, y: 250 }),
                spread: 'pi / 4',
                angle: 0,
                emissionRate: 't % 10 == 0',
                batchSize: 3
            })
        ];
        this.attractors = [
            new _models_index__WEBPACK_IMPORTED_MODULE_2__["Attractor"]({
                mass: 'sin(t / 20) * 20',
                position: new _models_index__WEBPACK_IMPORTED_MODULE_2__["Vector"]({ x: 350, y: 250 }),
            })
        ];
        this.selectedEmitter = this.emitters[0];
        requestAnimationFrame(this.startUpdate);
    };
    AppComponent.prototype.update = function () {
        var _this = this;
        this.attractors.forEach(function (a) { return a.update(_this.counter); });
        var newParticles = [];
        this.emitters.forEach(function (e) { return newParticles.push.apply(newParticles, e.update(_this.counter)); });
        var n = this.particles.length;
        for (var i = 0; i < n; i++) {
            var p = this.particles[i];
            if (p.position.x > 500 || p.position.y > 500)
                continue;
            if (p.isDead())
                continue;
            newParticles.push(p);
            p.update(this.attractors);
        }
        this.particles = newParticles;
    };
    AppComponent.prototype.onAttractorClick = function (attractor) {
        this.selectedAttractor = attractor;
        this.selectedEmitter = undefined;
    };
    AppComponent.prototype.onEmitterClick = function (emitter) {
        this.selectedEmitter = emitter;
        this.selectedAttractor = undefined;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["Location"], { provide: _angular_common__WEBPACK_IMPORTED_MODULE_0__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_0__["PathLocationStrategy"] }],
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_0__["Location"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _validators_math_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators/math-validator */ "./src/app/validators/math-validator.ts");
/* harmony import */ var _stage_stage_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stage/stage.component */ "./src/app/stage/stage.component.ts");
/* harmony import */ var _emitter_renderer_emitter_renderer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./emitter-renderer/emitter-renderer.component */ "./src/app/emitter-renderer/emitter-renderer.component.ts");
/* harmony import */ var _attractor_renderer_attractor_renderer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./attractor-renderer/attractor-renderer.component */ "./src/app/attractor-renderer/attractor-renderer.component.ts");
/* harmony import */ var _attractor_detail_attractor_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attractor-detail/attractor-detail.component */ "./src/app/attractor-detail/attractor-detail.component.ts");
/* harmony import */ var _emitter_detail_emitter_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./emitter-detail/emitter-detail.component */ "./src/app/emitter-detail/emitter-detail.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _stage_stage_component__WEBPACK_IMPORTED_MODULE_6__["StageComponent"],
                _emitter_renderer_emitter_renderer_component__WEBPACK_IMPORTED_MODULE_7__["EmitterRendererComponent"],
                _attractor_renderer_attractor_renderer_component__WEBPACK_IMPORTED_MODULE_8__["AttractorRendererComponent"],
                _attractor_detail_attractor_detail_component__WEBPACK_IMPORTED_MODULE_9__["AttractorDetailComponent"],
                _emitter_detail_emitter_detail_component__WEBPACK_IMPORTED_MODULE_10__["EmitterDetailComponent"],
                _validators_math_validator__WEBPACK_IMPORTED_MODULE_5__["MathValidatorDirective"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatInputModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/attractor-detail/attractor-detail.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/attractor-detail/attractor-detail.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".attractor-detail {\n  margin-left: 10px;\n}\n"

/***/ }),

/***/ "./src/app/attractor-detail/attractor-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/attractor-detail/attractor-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"attractor-detail\">\n\n\n  <form class=\"example-form\" >\n    <h2>Attractor</h2>\n\n    <mat-form-field>\n      <mat-label>x</mat-label>\n      <input name=\"x\" matInput type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"attractor.position.x\"/>\n    </mat-form-field>\n\n    <mat-form-field>\n      <mat-label>y</mat-label>\n      <input name=\"y\" matInput type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"attractor.position.y\"/>\n    </mat-form-field>\n\n    <div>\n      <mat-form-field>\n        <mat-label>mass</mat-label>\n        <input name=\"mass\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"attractor.mass.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n    </div>\n\n  </form>\n\n</div>\n"

/***/ }),

/***/ "./src/app/attractor-detail/attractor-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/attractor-detail/attractor-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: AttractorDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttractorDetailComponent", function() { return AttractorDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index */ "./src/models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AttractorDetailComponent = /** @class */ (function () {
    function AttractorDetailComponent() {
    }
    AttractorDetailComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_index__WEBPACK_IMPORTED_MODULE_1__["Attractor"])
    ], AttractorDetailComponent.prototype, "attractor", void 0);
    AttractorDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-attractor-detail',
            template: __webpack_require__(/*! ./attractor-detail.component.html */ "./src/app/attractor-detail/attractor-detail.component.html"),
            styles: [__webpack_require__(/*! ./attractor-detail.component.css */ "./src/app/attractor-detail/attractor-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AttractorDetailComponent);
    return AttractorDetailComponent;
}());



/***/ }),

/***/ "./src/app/attractor-renderer/attractor-renderer.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/attractor-renderer/attractor-renderer.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".background {\n\n}\n\n.attractor.positive .background {\n  fill: green;\n}\n\n.attractor.negative .background {\n  fill: red;\n}\n\n.event-target {\n  fill: white;\n  fill-opacity: 10e-6;\n  cursor: move;\n}\n"

/***/ }),

/***/ "./src/app/attractor-renderer/attractor-renderer.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/attractor-renderer/attractor-renderer.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg:g class=\"attractor\" [ngClass]=\"{'positive': attractor.getMass() > 0, 'negative': attractor.getMass() < 0}\">\n\n  <svg:circle\n    class=\"background\"\n    [attr.cx]=\"attractor.position.x\"\n    [attr.cy]=\"attractor.position.y\"\n    [attr.r]=\"getMass()\"\n  />\n\n  <svg:g class=\"event-target-container\" (mousedown)=\"onMouseDown($event)\" (click)=\"onClick()\">\n    <svg:circle\n      class=\"event-target\"\n      [attr.cx]=\"attractor.position.x\"\n      [attr.cy]=\"attractor.position.y\"\n      [attr.r]=\"20\"\n    />\n  </svg:g>\n\n</svg:g>\n"

/***/ }),

/***/ "./src/app/attractor-renderer/attractor-renderer.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/attractor-renderer/attractor-renderer.component.ts ***!
  \********************************************************************/
/*! exports provided: AttractorRendererComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttractorRendererComponent", function() { return AttractorRendererComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index */ "./src/models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AttractorRendererComponent = /** @class */ (function () {
    function AttractorRendererComponent() {
    }
    AttractorRendererComponent.prototype.ngOnInit = function () {
    };
    AttractorRendererComponent.prototype.onMouseDown = function (e) {
        this.positionStartingPoint = new _models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"]({ x: e.layerX, y: e.layerY });
    };
    AttractorRendererComponent.prototype.onGlobalMouseMove = function (e) {
        var newPoint = new _models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"]({ x: e.layerX, y: e.layerY });
        if (this.positionStartingPoint) {
            this.attractor.position
                .add(newPoint.copy().subtract(this.positionStartingPoint));
            this.positionStartingPoint = newPoint;
        }
    };
    AttractorRendererComponent.prototype.onGlobalMouseUp = function (e) {
        this.positionStartingPoint = null;
    };
    AttractorRendererComponent.prototype.onClick = function () {
    };
    AttractorRendererComponent.prototype.getMass = function () {
        return Math.abs(this.attractor.getMass());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_index__WEBPACK_IMPORTED_MODULE_1__["Attractor"])
    ], AttractorRendererComponent.prototype, "attractor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AttractorRendererComponent.prototype, "onGlobalMouseMove", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], AttractorRendererComponent.prototype, "onGlobalMouseUp", null);
    AttractorRendererComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: '[app-attractor-renderer]',
            template: __webpack_require__(/*! ./attractor-renderer.component.html */ "./src/app/attractor-renderer/attractor-renderer.component.html"),
            styles: [__webpack_require__(/*! ./attractor-renderer.component.css */ "./src/app/attractor-renderer/attractor-renderer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AttractorRendererComponent);
    return AttractorRendererComponent;
}());



/***/ }),

/***/ "./src/app/emitter-detail/emitter-detail.component.css":
/*!*************************************************************!*\
  !*** ./src/app/emitter-detail/emitter-detail.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".emitter-detail {\n  margin-left: 10px;\n}\n"

/***/ }),

/***/ "./src/app/emitter-detail/emitter-detail.component.html":
/*!**************************************************************!*\
  !*** ./src/app/emitter-detail/emitter-detail.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"emitter-detail\">\n\n\n  <form class=\"example-form\" >\n    <h2>Emitter</h2>\n\n    <mat-form-field>\n      <mat-label>x</mat-label>\n      <input name=\"x\" matInput type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"emitter.position.x\"/>\n    </mat-form-field>\n\n    <mat-form-field>\n      <mat-label>y</mat-label>\n      <input name=\"y\" matInput type=\"number\" step=\"1\" min=\"0\" [(ngModel)]=\"emitter.position.y\"/>\n    </mat-form-field>\n\n    <div>\n      <mat-form-field>\n        <mat-label>angle</mat-label>\n        <input name=\"angleExpression\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"emitter.angle.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n\n      <mat-form-field>\n        <mat-label>spread</mat-label>\n        <input name=\"spread\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"emitter.spread.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n    </div>\n\n\n    <div>\n      <mat-form-field>\n        <mat-label>particles' initial velocity</mat-label>\n        <input name=\"velocity\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"emitter.velocity.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n\n      <mat-form-field>\n        <mat-label>batch size</mat-label>\n        <input name=\"batchSize\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"emitter.batchSize.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n    </div>\n\n    <div>\n      <mat-form-field>\n        <mat-label>emission rate ({{emitter.getEmissionRate()}})</mat-label>\n        <input name=\"emissionRate\" [errorStateMatcher]=\"matcher\" matInput [(ngModel)]=\"emitter.emissionRate.expression\" mathValidator=\"t\"/>\n      </mat-form-field>\n    </div>\n\n  </form>\n\n</div>\n"

/***/ }),

/***/ "./src/app/emitter-detail/emitter-detail.component.ts":
/*!************************************************************!*\
  !*** ./src/app/emitter-detail/emitter-detail.component.ts ***!
  \************************************************************/
/*! exports provided: EmitterDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterDetailComponent", function() { return EmitterDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index */ "./src/models/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmitterDetailComponent = /** @class */ (function () {
    function EmitterDetailComponent() {
    }
    EmitterDetailComponent.prototype.ngOnInit = function () {
    };
    EmitterDetailComponent.prototype.ngOnChanges = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_index__WEBPACK_IMPORTED_MODULE_1__["Emitter"])
    ], EmitterDetailComponent.prototype, "emitter", void 0);
    EmitterDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-emitter-detail',
            template: __webpack_require__(/*! ./emitter-detail.component.html */ "./src/app/emitter-detail/emitter-detail.component.html"),
            styles: [__webpack_require__(/*! ./emitter-detail.component.css */ "./src/app/emitter-detail/emitter-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EmitterDetailComponent);
    return EmitterDetailComponent;
}());



/***/ }),

/***/ "./src/app/emitter-renderer/emitter-renderer.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/emitter-renderer/emitter-renderer.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".event-target {\n  fill: white;\n  fill-opacity: 10e-6;\n  cursor: move;\n}\n\n.handle-container {\n  /*cursor: grab;*/\n}\n\n.handle {\n  fill: none;\n  stroke: black;\n}\n"

/***/ }),

/***/ "./src/app/emitter-renderer/emitter-renderer.component.html":
/*!******************************************************************!*\
  !*** ./src/app/emitter-renderer/emitter-renderer.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg:g (mouseenter)=\"onMouseEnter()\">\n\n  <svg:path\n    class=\"output-pipe\"\n    [attr.d]=\"getArc()\"\n  />\n\n  <svg:g class=\"handle-container\"  (mousedown)=\"onHandleDown($event)\">\n\n    <svg:path\n      class=\"handle\"\n      [attr.d]=\"getHandlePath()\"\n    />\n\n    <svg:circle\n      [attr.cx]=\"getKnobPosition().x\"\n      [attr.cy]=\"getKnobPosition().y\"\n      [attr.r]=\"3\"\n    />\n  </svg:g>\n\n  <svg:g class=\"event-target-container\" (mousedown)=\"onMouseDown($event)\">\n    <svg:circle\n      class=\"event-target\"\n      [attr.cx]=\"emitter.position.x\"\n      [attr.cy]=\"emitter.position.y\"\n      [attr.r]=\"20\"\n    />\n  </svg:g>\n\n</svg:g>\n"

/***/ }),

/***/ "./src/app/emitter-renderer/emitter-renderer.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/emitter-renderer/emitter-renderer.component.ts ***!
  \****************************************************************/
/*! exports provided: EmitterRendererComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterRendererComponent", function() { return EmitterRendererComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/index */ "./src/models/index.ts");
/* harmony import */ var _utils_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/svg */ "./src/utils/svg.ts");
/* harmony import */ var _utils_value_expression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/value-expression */ "./src/utils/value-expression.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var KNOB_PADDING = 10;
var EmitterRendererComponent = /** @class */ (function () {
    function EmitterRendererComponent() {
    }
    EmitterRendererComponent.prototype.getHandlePath = function () {
        var position = this.emitter.position;
        var end = position.copy().add(_models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"].fromPolar({ r: this.emitter.getInitialVelocity() + KNOB_PADDING, theta: this.emitter.getAngle() }));
        return [
            'M', position.x, position.y,
            'L', end.x, end.y
        ].join(' ');
    };
    EmitterRendererComponent.prototype.getKnobPosition = function () {
        var position = this.emitter.position;
        return position.copy().add(_models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"].fromPolar({ r: this.emitter.getInitialVelocity() + KNOB_PADDING, theta: this.emitter.getAngle() }));
    };
    EmitterRendererComponent.prototype.getArc = function () {
        var position = this.emitter.position;
        var spread = this.emitter.getSpread();
        var angle = this.emitter.getAngle();
        var initialVelocity = this.emitter.getInitialVelocity();
        return Object(_utils_svg__WEBPACK_IMPORTED_MODULE_2__["arc"])(position, initialVelocity, angle - spread / 2, angle + spread / 2);
    };
    EmitterRendererComponent.prototype.ngOnInit = function () {
    };
    EmitterRendererComponent.prototype.onMouseDown = function (e) {
        this.positionStartingPoint = new _models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"]({ x: e.layerX, y: e.layerY });
    };
    EmitterRendererComponent.prototype.onGlobalMouseMove = function (e) {
        var newPoint = new _models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"]({ x: e.layerX, y: e.layerY });
        if (this.positionStartingPoint) {
            this.emitter.position
                .add(newPoint.copy().subtract(this.positionStartingPoint));
            this.positionStartingPoint = newPoint;
        }
        else if (this.angleStartingPoint) {
            var _a = newPoint.subtract(this.emitter.position).toPolar(), r = _a.r, theta = _a.theta;
            this.emitter.angle = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_3__["ValueExpression"](theta);
            this.emitter.velocity = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_3__["ValueExpression"](r - KNOB_PADDING);
        }
    };
    EmitterRendererComponent.prototype.onGlobalMouseUp = function (e) {
        this.positionStartingPoint = null;
        this.angleStartingPoint = null;
    };
    EmitterRendererComponent.prototype.onHandleDown = function (e) {
        this.angleStartingPoint = new _models_index__WEBPACK_IMPORTED_MODULE_1__["Vector"]({ x: e.layerX, y: e.layerY });
    };
    EmitterRendererComponent.prototype.onMouseEnter = function () {
        console.log('enter');
    };
    EmitterRendererComponent.prototype.onMouseLeave = function () {
        console.log('leave');
    };
    EmitterRendererComponent.prototype.onClick = function () {
        console.log('click');
    };
    EmitterRendererComponent.prototype.ngOnChanges = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_index__WEBPACK_IMPORTED_MODULE_1__["Emitter"])
    ], EmitterRendererComponent.prototype, "emitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], EmitterRendererComponent.prototype, "onGlobalMouseMove", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], EmitterRendererComponent.prototype, "onGlobalMouseUp", null);
    EmitterRendererComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: '[app-emitter-renderer]',
            template: __webpack_require__(/*! ./emitter-renderer.component.html */ "./src/app/emitter-renderer/emitter-renderer.component.html"),
            styles: [__webpack_require__(/*! ./emitter-renderer.component.css */ "./src/app/emitter-renderer/emitter-renderer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EmitterRendererComponent);
    return EmitterRendererComponent;
}());



/***/ }),

/***/ "./src/app/stage/stage.component.css":
/*!*******************************************!*\
  !*** ./src/app/stage/stage.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".stage {\n  position: relative;\n}\n\ncanvas {\n  border: 1px solid steelblue;\n  background-color: rgba(35, 39, 41, 0.10);\n}\n"

/***/ }),

/***/ "./src/app/stage/stage.component.html":
/*!********************************************!*\
  !*** ./src/app/stage/stage.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"stage\">\n  <canvas #myCanvas></canvas>\n</div>\n"

/***/ }),

/***/ "./src/app/stage/stage.component.ts":
/*!******************************************!*\
  !*** ./src/app/stage/stage.component.ts ***!
  \******************************************/
/*! exports provided: StageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StageComponent", function() { return StageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StageComponent = /** @class */ (function () {
    function StageComponent() {
        this.width = 200;
        this.height = 200;
        this.drawables = [];
    }
    StageComponent.prototype.ngOnInit = function () {
        this.clear();
        this.draw();
    };
    StageComponent.prototype.ngOnChanges = function () {
        this.clear();
        this.draw();
    };
    StageComponent.prototype.clear = function () {
        this.canvasRef.nativeElement.width = this.width;
        this.canvasRef.nativeElement.height = this.height;
    };
    StageComponent.prototype.draw = function () {
        var ctx = this.canvasRef.nativeElement.getContext('2d');
        this.drawables.forEach(function (drawable) { return drawable.drawOn(ctx); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StageComponent.prototype, "width", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StageComponent.prototype, "height", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], StageComponent.prototype, "drawables", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myCanvas'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], StageComponent.prototype, "canvasRef", void 0);
    StageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stage',
            template: __webpack_require__(/*! ./stage.component.html */ "./src/app/stage/stage.component.html"),
            styles: [__webpack_require__(/*! ./stage.component.css */ "./src/app/stage/stage.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StageComponent);
    return StageComponent;
}());



/***/ }),

/***/ "./src/app/validators/math-validator.ts":
/*!**********************************************!*\
  !*** ./src/app/validators/math-validator.ts ***!
  \**********************************************/
/*! exports provided: MathValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathValidatorDirective", function() { return MathValidatorDirective; });
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mathjs */ "./node_modules/mathjs/index.js");
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mathjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



function mathValidator(variables) {
    return function (control) {
        var scope = {};
        variables.forEach(function (v) { return scope[v] = 0; });
        try {
            mathjs__WEBPACK_IMPORTED_MODULE_0__["parse"](control.value).eval(scope);
            return null;
        }
        catch (e) {
            return { 'invalidExpression': { value: control.value } };
        }
    };
}
var MathValidatorDirective = /** @class */ (function () {
    function MathValidatorDirective() {
    }
    MathValidatorDirective_1 = MathValidatorDirective;
    MathValidatorDirective.prototype.validate = function (control) {
        return this.variables ? mathValidator(this.variables.split(/\s*,\s*/))(control) : null;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('mathValidator'),
        __metadata("design:type", String)
    ], MathValidatorDirective.prototype, "variables", void 0);
    MathValidatorDirective = MathValidatorDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[mathValidator]',
            providers: [{ provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"], useExisting: MathValidatorDirective_1, multi: true }]
        })
    ], MathValidatorDirective);
    return MathValidatorDirective;
    var MathValidatorDirective_1;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/models/attractor.ts":
/*!*********************************!*\
  !*** ./src/models/attractor.ts ***!
  \*********************************/
/*! exports provided: Attractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attractor", function() { return Attractor; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/models/vector.ts");
/* harmony import */ var _utils_value_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value-expression */ "./src/utils/value-expression.ts");


var G = 0.1;
var Attractor = /** @class */ (function () {
    function Attractor(params) {
        this.time = 0;
        this.position = params.position || _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].ORIGIN();
        this.mass = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_1__["ValueExpression"](params.mass);
    }
    Attractor.fromJS = function (js) {
        return new Attractor({
            position: _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromJS(js.position),
            mass: js.mass
        });
    };
    Attractor.prototype.toJS = function () {
        return {
            position: this.position.toJS(),
            mass: this.mass.expression
        };
    };
    Attractor.prototype.getMass = function () {
        return this.mass.eval({ t: this.time });
    };
    Attractor.prototype.update = function (index) {
        this.time = index;
    };
    Attractor.prototype.getAttractionForce = function (p) {
        var mass = this.getMass();
        var force = this.position
            .copy()
            .subtract(p.position);
        var distance = force.getMagnitude();
        if (distance < mass) {
            p.kill();
            return new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"]({ x: 0, y: 0 });
        }
        var strength = (G * mass * p.mass) / (distance * distance);
        return force.normalize().multiply(strength);
    };
    Attractor.prototype.drawOn = function (ctx) {
        ctx.strokeStyle = 'rgba(211, 211, 211, 1.00)';
        ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, Math.abs(this.mass), 0, Math.PI * 2);
        ctx.stroke();
    };
    return Attractor;
}());



/***/ }),

/***/ "./src/models/emitter.ts":
/*!*******************************!*\
  !*** ./src/models/emitter.ts ***!
  \*******************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/models/vector.ts");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./src/models/particle.ts");
/* harmony import */ var _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value-expression */ "./src/utils/value-expression.ts");



var Emitter = /** @class */ (function () {
    function Emitter(params) {
        this.time = 0;
        this.position = params.position || new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"]({ x: 0, y: 0 });
        this.angle = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__["ValueExpression"](params.angle);
        this.spread = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__["ValueExpression"](params.spread);
        this.velocity = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__["ValueExpression"](params.initialVelocity || '20');
        this.batchSize = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__["ValueExpression"](params.batchSize || '10');
        this.emissionRate = new _utils_value_expression__WEBPACK_IMPORTED_MODULE_2__["ValueExpression"](params.emissionRate || '1');
    }
    Emitter.fromJS = function (js) {
        return new Emitter({
            position: _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromJS(js.position),
            angle: js.angle,
            spread: js.spread,
            initialVelocity: js.initialVelocity,
            batchSize: js.batchSize,
            emissionRate: js.emissionRate
        });
    };
    Emitter.prototype.toJS = function () {
        return {
            position: this.position.toJS(),
            angle: this.angle.expression,
            spread: this.spread.expression,
            batchSize: this.batchSize.expression,
            emissionRate: this.emissionRate.expression,
            initialVelocity: this.velocity.expression,
        };
    };
    Emitter.prototype.getAngle = function () {
        return this.angle.eval({ t: this.time });
    };
    Emitter.prototype.getSpread = function () {
        return this.spread.eval({ t: this.time });
    };
    Emitter.prototype.getBatchSize = function () {
        return this.batchSize.eval({ t: this.time });
    };
    Emitter.prototype.getEmissionRate = function () {
        return this.emissionRate.eval({ t: this.time });
    };
    Emitter.prototype.getInitialVelocity = function () {
        return this.velocity.eval({ t: this.time });
    };
    Emitter.prototype.getNewParticle = function (index, count) {
        var initialVelocity = this.getInitialVelocity();
        var spread = this.getSpread();
        var angle = this.getAngle();
        var step = count > 1 ? (spread / (count - 1)) * index : spread / 2;
        var velocity = _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromPolar({
            r: initialVelocity / 20,
            theta: angle - spread / 2 + step
        });
        return new _particle__WEBPACK_IMPORTED_MODULE_1__["Particle"]({
            position: this.position.copy(),
            velocity: velocity
        });
    };
    Emitter.prototype.getNozzlePosition = function () {
        return _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromPolar({ r: this.getInitialVelocity(), theta: this.getAngle() });
    };
    Emitter.prototype.update = function (time) {
        this.time = time;
        var rate = this.getEmissionRate();
        if (!rate)
            return [];
        var batchSize = this.getBatchSize();
        var newParticles = [];
        for (var i = 0; i < batchSize; i++) {
            newParticles.push(this.getNewParticle(i, batchSize));
        }
        return newParticles;
    };
    Emitter.prototype.drawOn = function (ctx) {
        var _a = this.position, x = _a.x, y = _a.y;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        // ctx.moveTo(x, y - 10);
        // ctx.lineTo(x, y + 10);
        // ctx.moveTo(x + 10, y);
        // ctx.lineTo(x - 10, y);
        // ctx.arc(this.position.x, this.position.y, this.initialVelocity, 0, Math.PI * 2);
        ctx.stroke();
    };
    return Emitter;
}());



/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! exports provided: Vector, Emitter, Particle, Attractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/models/vector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"]; });

/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ "./src/models/emitter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return _emitter__WEBPACK_IMPORTED_MODULE_1__["Emitter"]; });

/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particle */ "./src/models/particle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return _particle__WEBPACK_IMPORTED_MODULE_2__["Particle"]; });

/* harmony import */ var _attractor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attractor */ "./src/models/attractor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attractor", function() { return _attractor__WEBPACK_IMPORTED_MODULE_3__["Attractor"]; });







/***/ }),

/***/ "./src/models/particle.ts":
/*!********************************!*\
  !*** ./src/models/particle.ts ***!
  \********************************/
/*! exports provided: Particle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/models/vector.ts");
/* harmony import */ var _utils_nan_or__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/nan-or */ "./src/utils/nan-or.ts");


var LIFE_SPAN = 500;
var Particle = /** @class */ (function () {
    function Particle(params) {
        this.mass = 1;
        this.position = params.position || _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].ORIGIN();
        this.velocity = params.velocity || _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].ORIGIN();
        this.acceleration = params.acceleration || _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].ORIGIN();
        this.lifeSpan = Object(_utils_nan_or__WEBPACK_IMPORTED_MODULE_1__["default"])(params.lifeSpan, LIFE_SPAN);
        this.color = params.color || [172, 207, 165];
    }
    Particle.prototype.update = function (attractors) {
        var _this = this;
        if (attractors === void 0) { attractors = []; }
        this.lifeSpan = this.lifeSpan - 1;
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        attractors.forEach(function (attractor) {
            _this.acceleration.add(attractor.getAttractionForce(_this));
        });
    };
    Particle.prototype.kill = function () {
        this.lifeSpan = 0;
    };
    Particle.prototype.isDead = function () {
        return this.lifeSpan <= 0 || this.position.x < 0 || this.position.y < 0;
    };
    Particle.prototype.getOpacity = function () {
        return this.lifeSpan / LIFE_SPAN;
    };
    Particle.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };
    Particle.prototype.drawOn = function (ctx) {
        var position = this.position;
        ctx.fillStyle = "rgb(" + this.color.join(',') + ", " + this.getOpacity() + ")";
        ctx.beginPath();
        ctx.fillRect(position.x - 1, position.y - 1, 2, 2);
        // ctx.arc(position.getX(), position.getY(), this.getMass(), 0, Math.PI * 2);
        ctx.fill();
    };
    return Particle;
}());



/***/ }),

/***/ "./src/models/vector.ts":
/*!******************************!*\
  !*** ./src/models/vector.ts ***!
  \******************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
/* harmony import */ var _utils_nan_or__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/nan-or */ "./src/utils/nan-or.ts");

var Vector = /** @class */ (function () {
    function Vector(params) {
        this.x = Object(_utils_nan_or__WEBPACK_IMPORTED_MODULE_0__["default"])(params.x, 1);
        this.y = Object(_utils_nan_or__WEBPACK_IMPORTED_MODULE_0__["default"])(params.y, 1);
    }
    Vector.ORIGIN = function () {
        return new Vector({ x: 0, y: 0 });
    };
    Vector.fromJS = function (params) {
        return new Vector(params);
    };
    Vector.fromPolar = function (params) {
        var r = params.r, theta = params.theta;
        return new Vector({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta)
        });
    };
    Vector.prototype.toJS = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    Vector.prototype.toPolar = function () {
        return {
            r: this.getMagnitude(),
            theta: Math.atan2(this.y, this.x)
        };
    };
    Vector.prototype.add = function (other) {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
        return this;
    };
    Vector.prototype.subtract = function (other) {
        this.x = this.x - other.x;
        this.y = this.y - other.y;
        return this;
    };
    Vector.prototype.multiply = function (value) {
        this.x = this.x * value;
        this.y = this.y * value;
        return this;
    };
    Vector.prototype.divide = function (value) {
        this.x = this.x / value;
        this.y = this.y / value;
        return this;
    };
    Vector.prototype.normalize = function () {
        var m = this.getMagnitude();
        if (m) {
            this.divide(m);
        }
        return this;
    };
    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.copy = function () {
        return new Vector({ x: this.x, y: this.y });
    };
    return Vector;
}());



/***/ }),

/***/ "./src/utils/nan-or.ts":
/*!*****************************!*\
  !*** ./src/utils/nan-or.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nanOr; });
function nanOr(value, defaultValue) {
    return isNaN(value) ? defaultValue : +value;
}


/***/ }),

/***/ "./src/utils/svg.ts":
/*!**************************!*\
  !*** ./src/utils/svg.ts ***!
  \**************************/
/*! exports provided: arc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return arc; });
/* harmony import */ var _models_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/index */ "./src/models/index.ts");

function arc(center, radius, startAngle, endAngle) {
    var start = center.copy().add(_models_index__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromPolar({ r: radius, theta: endAngle }));
    var end = center.copy().add(_models_index__WEBPACK_IMPORTED_MODULE_0__["Vector"].fromPolar({ r: radius, theta: startAngle }));
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
        'M', center.x, center.y,
        'L', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        'L', center.x, center.y
    ].join(' ');
}


/***/ }),

/***/ "./src/utils/value-expression.ts":
/*!***************************************!*\
  !*** ./src/utils/value-expression.ts ***!
  \***************************************/
/*! exports provided: ValueExpression */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueExpression", function() { return ValueExpression; });
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mathjs */ "./node_modules/mathjs/index.js");
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mathjs__WEBPACK_IMPORTED_MODULE_0__);

var ValueExpression = /** @class */ (function () {
    function ValueExpression(expression) {
        this.expression = expression;
    }
    Object.defineProperty(ValueExpression.prototype, "expression", {
        get: function () {
            return this._expression;
        },
        set: function (value) {
            try {
                var p = mathjs__WEBPACK_IMPORTED_MODULE_0__["parse"](value);
                p.eval({ t: 0 });
                this._expression = value;
                this._parsedExpression = p;
            }
            catch (e) {
            }
        },
        enumerable: true,
        configurable: true
    });
    ValueExpression.prototype.eval = function (scope) {
        return this._parsedExpression.eval(scope);
    };
    return ValueExpression;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/zub/Projects/particles/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map