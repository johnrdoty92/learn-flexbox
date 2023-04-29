import classes from '../../css/App.module.css'

export const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className={classes.container}>{children}</div>
}
