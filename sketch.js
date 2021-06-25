const colorPalette = [
  "#fd3f92",
  "#c90e40",
  "#9a4eae",
  "#63b8e1",
  "#5d7abb",
  "#2aa95b",
  "#f3cb15",
  "#ff7900",
];

const r = 25;
const grid = 10;

class Route {
  generateRoute(stops, grid) {
    for (let i = 0; i < stops; i++) {
      const point = [
        int(random(grid - 1) + 1) * int(width / grid),
        int(random(grid - 1) + 1) * int(height / grid),
      ];
      // Don't add duplicate points
      if (!this.checkPoint(point, this.stations)) {
        --i;
        continue;
      }
      this.stations.push(point);
    }
  }

  checkPoint(p, check) {
    for (let p2 of check) {
      if (p[0] == p2[0] && p[1] == p2[1]) {
        return false;
      }
    }
    return true;
  }

  constructor(stops, grid) {
    this.stations = [];
    this.col = color(random(colorPalette));

    this.generateRoute(stops, grid);
  }
}

function setup() {
  createCanvas(720, 720);
  background(color(255, 241, 208));
  strokeWeight(10);
}

function drawSubwayLine(p1, p2) {
  let midPoint;
  if (abs(p1[0] - p2[0]) < abs(p1[1] - p2[1])) {
    const m = p2[1] < p1[1] ? -1 : 1;
    midPoint = [p2[0], m * abs(p1[0] - p2[0]) + p1[1]];
  } else {
    const m = p2[0] < p1[0] ? -1 : 1;
    midPoint = [m * abs(p2[1] - p1[1]) + p1[0], p2[1]];
  }

  // Draw lines
  line(p1[0], p1[1], midPoint[0], midPoint[1]);
  line(midPoint[0], midPoint[1], p2[0], p2[1]);
}

function drawStation(p1) {
  fill(color(255, 241, 208));
  ellipse(p1[0], p1[1], r, r);
}

function draw() {
  background(color(255, 241, 208));

  frameRate(0.5);
  routes = [];
  for (let i = 0; i < 3; i++) {
    routes.push(new Route(int(random(4)) + 2, grid));
  }

  // Draw lines
  for (let route of routes) {
    stroke(route.col);
    for (let i = 0; i < route.stations.length - 1; i++) {
      drawSubwayLine(route.stations[i], route.stations[i + 1]);
    }
  }
  for (let route of routes) {
    stroke(route.col);
    for (let index of route.stations) {
      drawStation(index);
    }
  }
}
