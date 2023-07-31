export type Coordinate = {
	x: number;
	y: number;
};

export type RadarChartLayoutOptions = {
  height?: number
  width?: number
  axes?: number
  sections?: number
  startingAngle?: number
}

export default class RadarChartLayout {
	width = 1200;
	height = 750;
  axes = 5;
  sections = 5;
  startingAngle = 0;
  angleInterval: number;
  center: Coordinate;
  radius: number;

	constructor(opts?: RadarChartLayoutOptions) {
		this.width = opts?.width ? opts.width : this.width
		this.height = opts?.height ? opts.height : this.height
    this.axes = opts?.axes ? opts.axes : this.axes
    this.sections = opts?.sections ? opts.sections : this.sections
    this.startingAngle = opts?.startingAngle ? opts.startingAngle : this.startingAngle

    this.angleInterval = 360 / this.axes
    this.center = { x: this.width/2, y: this.height/2}
    this.radius = Math.min(this.width, this.height) * 0.45
	}

  getAxesPaths = () : string[] => {
    const axesPaths: string[] = [];

    for (let i = 0; i < this.axes; i++) {
      const axisPath = this.getAxisPath(this.startingAngle + i * this.angleInterval);
      axesPaths.push(axisPath);
    }

    return axesPaths
  }

  getAxisPath = (angle: number) => {
    const pathPoints = this.calculatePathPoints(angle);
    let path = `
            M${pathPoints[0].x} ${pathPoints[0].y} 
            ${pathPoints
              .slice(1)
              .map(p => {
                return `L${p.x} ${p.y}`;
              })
              .join(' ')}
          `;
  
    return path;
  }

  calculatePathPoints = (
    angle: number
  ): Coordinate[] => {
    const points: Coordinate[] = [this.center];
    const pointInterval = this.radius / this.sections;
    const angleRad = degrees2Radians(angle);
  
    let previousPoint = points[0];
    for (let i = 0; i < this.sections; i++) {
      let nextPoint: Coordinate = {
        x: previousPoint.x + pointInterval * Math.cos(angleRad),
        y: previousPoint.y + pointInterval * Math.sin(angleRad)
      };
  
      points.push(nextPoint);
      previousPoint = nextPoint;
    }
  
    return points;
  }
}

function degrees2Radians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
