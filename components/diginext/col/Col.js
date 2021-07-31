import { useEffect } from 'react';
import css from 'styled-jsx/css';

import styles from "./Col.module.scss";
// import { colStyles } from "./Col.style";

const colWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
/**
 * Render div with class col
 * @param {any} props.xs - expand on mobile
 * @param {any} props.sm - expand on mobile
 * @param {any} props.md - expand on tablet
 * @param {any} props.lg - expand on tablet
 * @param {any} props.xl - expand on desktop
 * @param {number} props.gutter - padding horizontal padding (equals to rows' horizontal margin)
 * @param {string} props.className - additional className
 * @param {Array} props.widths - arrays of media queries
 */

export default function Col(props) {

    const {
        xs = {},
        sm = {},
        md = {},
        lg = {},
        xl = {},
        className = "",
        widths = colWidths,
        gutter = 30,
        ...rest
    } = props

    // generate column class
    const getColumnSizeClass = function (isXs, colWidth, colSize) {
        if (colSize === true || colSize === "") {
            return isXs ? "col" : "col-" + colWidth;
        } else if (colSize === "auto") {
            return isXs ? "col-" + colSize : "col-" + colWidth + "-auto";
        }
        // if colSize is a number:
        return isXs ? "col-" + colSize : "col-" + colWidth + "-" + colSize;
    }


    let colClasses = [];
    // default col className
    // if (!colClasses.length) {
    colClasses.push("col");
    colClasses.push(styles.col);
    colClasses.push(className)
    // }

    widths.forEach(function (colWidth, index) {
        // get value in props
        let columnProp = props[colWidth];

        if (!columnProp && columnProp !== "") return;

        let isXs = !index;

        // get column size class, by columnProp (expect columnProp is a number)
        // TODO: handle when columnProp is an object, with size, order, offset ?

        const columnSizeClass = getColumnSizeClass(isXs, colWidth, columnProp);
        colClasses.push(styles[columnSizeClass]);
    });

    const classNames = colClasses.join(" ");
    
    return <>
        <div className={classNames} {...rest}>
            <style jsx>{`
                .col {
                    padding-left: ${gutter / 2}px;
                    padding-right: ${gutter / 2}px;
                }
        `}</style>
            {rest.children}
        </div>
    </>
}