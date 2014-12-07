/**
 * Module dependencies.
 */

var canvas    = document.body.appendChild(document.createElement('canvas'));
var gl        = require('gl-context')(canvas, render);
var canvasFit = require('canvas-fit')(canvas);
var triangle  = require('a-big-triangle');
var glslify   = require('glslify');

window.addEventListener('resize', canvasFit, false);


/**
 * Create shader.
 */

var shader = glslify({
  frag: './wave.frag',
  vert: './wave.vert',
  transform: ['glslify-hex']
})(gl);

/**
 * Render.
 */

var start = Date.now();

function render() {
  var width = gl.drawingBufferWidth;
  var height = gl.drawingBufferHeight;

  // set viewport to be full screen.
  gl.viewport(0, 0, width, height);
  shader.bind();

  // pass in screen size to shaders
  shader.uniforms.uTime = (Date.now() - start) / 1000;
  shader.uniforms.uScreenSize = [width, height];
  triangle(gl);
}
