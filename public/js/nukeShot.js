// nukeShot class - represents the tank shooting a nuke powerup
// does nukeShot need a shotid?
function nukeShot(shotid, tankid, spos, angle, color) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);
    this.color = color;
    this.shotid = shotid;
    this.tankid = tankid;
  
    this.update = function() {
      this.pos.add(this.vel);
    }
    
    // Render the nuke to the screen by Alan F
    this.render = function() {
        push();
        
    }
    // original render function
    /*this.render = function() {
      push();
      stroke(this.color);
      strokeWeight(8);
      point(this.pos.x, this.pos.y);
      pop();
    }*/
  
    // Check if the nuke hits another tank
    // in the future this will include if it hits an obstacle as well
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