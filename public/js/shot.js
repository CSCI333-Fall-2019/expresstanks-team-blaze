// Shot class - represents shots by the tank
function Shot(shotid, tankid, spos, angle, color) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(3);
  this.color = color;
  this.shotid = shotid;
  this.tankid = tankid;
  // added variables - Blake and Alan
  this.heading = angle;
  this.isNuke = false;

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  // Render the shot to the screen
  this.render = function() {

    push();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 18, 18);
    point(this.pos.x, this.pos.y);
    pop();
  }


  // Check if the shot moves off screen.  In which case, kill it
  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      socket.emit('ClientRemoveShot', this.shotid);
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      socket.emit('ClientRemoveShot', this.shotid);
      return true;
    }
    return false;
  }


}