// Reliant upon a pickup class made by Eli and Stu

/* appearance:
    this.render = function() {
        push();
        fill(0);
        circle(locX, locY, radius);
        translate(0, locY - ?); // bottom triangle
        triangle(x1, y1, x2, y2, x3, y3);
        translate(locX - ?, 0); // left triangle
        rotate();
        triangle(x1, y1, x2, y2, x3, y3);
        translate(locX + ?, 0); // right triangle
        rotate();
        triangle(x1, y1, x2, y2, x3, y3);
    }*/