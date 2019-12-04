// Shot class - represents shots by the tank
function Shot(shotid, tankid, spos, angle, color/*, nuke*/) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(3);
  this.color = color;
  this.shotid = shotid;
  this.tankid = tankid;
  //this.nuke = nuke;

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  // Render the shot to the screen
  this.render = function() {
    push();
    stroke(this.color);
    fill('yellow')
    strokeWeight(0);
    ellipse(this.pos.x,this.pos.y,18,18);
    square(this.pos.x-9,this.pos.y,18)
    fill('black');
    
    triangle(this.pos.x,this.pos.y,this.pos.x,this.pos.y+9,this.pos.x+4.5,this.pos.y+4.5);
    triangle(this.pos.x,this.pos.y,this.pos.x-4.5,this.pos.y+4.5,this.pos.x-4.5,this.pos.y-4.5);
    triangle(this.pos.x,this.pos.y,this.pos.x,this.pos.y-9,this.pos.x+4.5,this.pos.y-4.5);
//      point(this.pos.x, this.pos.y);
    pop();
  }

  // Check if the tank hits another tank
  this.hits = function(enemyTank) {
    var d = dist(this.pos.x, this.pos.y, enemyTank.pos.x, enemyTank.pos.y);
    if (d < enemyTank.r) {
      return true;
    } else {
      return false;
    }
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