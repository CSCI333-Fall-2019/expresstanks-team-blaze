// nukeShot class - represents the tank shooting a nuke powerup
// does nukeShot need a shotid?
function nukeShot(shotid, tankid, spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(3);
    this.color = 'yellow';
    this.shotid = shotid;
    this.tankid = tankid;
  
    this.update = function() {
      this.pos.add(this.vel);
    }
    
    // Render the nuke to the screen by Alan F
    this.render = function() {
        push();
        fill('yellow');
        ellipse(this.pos.x, this.pos.y, 18, 18);
        point(this.pos.x, this.pos.y);
        pop();
        // fill('yellow');
        // ellipse(?, ?, ?, ?);
        // suqare(?, ?, ?);
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
        //Will need to create splash damage before shot expires - Blake & Alan
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        socket.emit('ClientRemoveShot', this.shotid);
        return true;
      }
      if (this.pos.y > height || this.pos.y < 0) {
        //Will need to create splash damage before shot expires - Blake & Alan

        socket.emit('ClientRemoveShot', this.shotid);
        return true;
      }
      return false;
    }
  }