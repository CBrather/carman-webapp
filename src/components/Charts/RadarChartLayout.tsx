export type Coordinate = {
	x: number;
	y: number;
};

export type RadarChartLayoutOptions = {
  height?: number
  width?: number
  startingAngle?: number
}

export default class RadarChartLayout {
	width = 1200;
	height = 750;
  sections = 5;
  startingAngle = 0;
  angleInterval: number;
  center: Coordinate;
  radius: number;

  private axes: Axis[] = []
  private radialEdges: Coordinate[][] = []

	constructor(axes: AxisUncalculated[], opts?: RadarChartLayoutOptions) {
    if (axes.length == 0) throw Error("No axes provided to RadarChart on initialization")

		this.width = opts?.width ? opts.width : this.width
		this.height = opts?.height ? opts.height : this.height
    this.startingAngle = opts?.startingAngle ? opts.startingAngle : this.startingAngle

    this.center = { x: this.width/2, y: this.height/2}
    this.radius = Math.min(this.width, this.height) * 0.45

    this.sections = axes[0]?.ticks.length ?? 1
    this.angleInterval = 360 / axes.length
    
    this.calculateAxes(axes)
	}

  calculateAxes = (axes: Axis[] | AxisUncalculated[]) : void => {
    this.axes = axes.map((axis, i) : Axis => {
      return this.calculateAxisTicks(axis, this.startingAngle + i * this.angleInterval)
    })

    this.calculateRadialEdges()
  }

  recalculateAxes = () : void => {
    this.calculateAxes(this.axes)
  }

  calculateAxisTicks = (axis: Axis | AxisUncalculated, angle: number): Axis => {
    const points: Coordinate[] = [this.center];
    const pointInterval = this.radius / this.sections;
    const angleRad = degrees2Radians(angle);
  
    let previousPoint = points[0];
    for (let tick of axis.ticks) {
      let nextPoint: Coordinate = {
        x: previousPoint.x + pointInterval * Math.cos(angleRad),
        y: previousPoint.y + pointInterval * Math.sin(angleRad)
      };
  
      tick.location = nextPoint;
      previousPoint = nextPoint;
    }
  
    return axis as Axis;
  }

  calculateRadialEdges = () : void => {
    this.radialEdges = []

    for (let i = 0; i < this.sections; i++) {
      const sectionPoints = this.axes.map(axis => axis.ticks[i].location)
      this.radialEdges.push(sectionPoints)
    }
  }

  getAxesPaths = () : string[] => {
    const axesPaths: string[] = [];

    for (let axis of this.axes) {
      const axisPath = this.getAxisPath(axis);
      axesPaths.push(axisPath);
    }

    return axesPaths
  }

  getAxisPath = (axis: Axis) : string =>  {
    let pathPoints = axis.ticks.map(tick => tick.location)
  
    return this.buildSvgPath([this.center, ...pathPoints]);
  }

  getRadialEdgesPaths = () : string[] => {
    const edgePaths: string[] = []

    for (let edgePoints of this.radialEdges) {
      const path = this.buildSvgPath(edgePoints, true)
      edgePaths.push(path)
    }

    return edgePaths
  }

  buildSvgPath = (pathPoints: Coordinate[], close: boolean = false) : string => {
    let path = `
    M${pathPoints[0].x} ${pathPoints[0].y} 
    ${pathPoints
      .slice(1)
      .map(point => {
        return `L${point.x} ${point.y}`
      })
      
      .join(' ')}
    `;

    if (close) path += ` L${pathPoints[0].x} ${pathPoints[0].y}`

    return path
  }
}

export type AxisUncalculated = {
  label: string
  ticks: AxisTickUncalculated[]
}

type Axis = {
  label: string
  ticks: AxisTick[]
}

type AxisTick = {
  label: string
  location: Coordinate
}

type AxisTickUncalculated = {
  label: string
  location?: Coordinate
}

function degrees2Radians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
