interface IbaseIcon {
  color?: string
  source?: ImageSourcePropType
}

export interface IBaseTitle {
  baseIcon: IbaseIcon
  title?: string
  linkURL?: string
}

export interface IGoalProcess {
  id: number
}
