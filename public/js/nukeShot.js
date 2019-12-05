// nukeShot class - represents the tank shooting a nuke powerup
function nukeShot(shotid, tankid, spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(3);
    this.color = 'yellow';
    this.shotid = shotid;
    this.tankid = tankid;
    this.heading = angle;
    this.isNuke = true;

    this.update = function() {
      this.pos.add(this.vel);
    }
    
    // Render the nuke to the screen by Blake and Alan
    this.render = function() {
      push();
      stroke(this.color);
      fill('yellow')
      strokeWeight(0);
  
      translate(this.pos.x, this.pos.y);
      rotate(this.heading);
  
      ellipse(0,0,18,18);
      square(-9,0,18)
      fill('black');
      triangle(0,0,0,0+9,0+4.5,0+4.5);
      triangle(0,0,0-4.5,0+4.5,0-4.5,0-4.5);
      triangle(0,0,0,0-9,0+4.5,0-4.5);

      pop();
    }
  
    // Check if the nuke hits another tank
    // in the future this will include if it hits an obstacle as well
    this.hits = function(enemyTank) {
      var d = dist(this.pos.x, this.pos.y, enemyTank.pos.x, enemyTank.pos.y);
      if (d < enemyTank.r) {
        // splash damage needed as well here - Blake & Alan
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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