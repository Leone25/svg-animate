export interface Props extends React.HTMLProps<HTMLDivElement> {
    children: [React.ReactChild, React.ReactChild],
    initialSize?: [number, number],
    minSizes?: [[number, number],[number, number]],
}