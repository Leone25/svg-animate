export interface Props extends React.HTMLProps<HTMLDivElement> {
    children: [React.ReactChild, React.ReactChild],
    initialSizes?: number,
    minSizes?: [number, number],
}