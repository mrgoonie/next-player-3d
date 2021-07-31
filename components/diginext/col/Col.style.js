import css from 'styled-jsx/css';
const gridColumns = 10;
const gridGutterWidth = 30;
const gridRowColumns = 5;
const gridBreakpoints = [
    { name: "xs", value: "0" },
    { name: "sm", value: "576" },
    { name: "md", value: "768" },
    { name: "lg", value: "992" },
    { name: "xl", value: "1200" },
]

/**
 * return value of minimum breakpoint compared to array of breakpoints ?
 * @param {string} name - breakpoint name
 * @param {object[]} breakpoints - array of breakpoints
 */
const breakpointMin = (name, breakpoints = gridBreakpoints) => {
    const min = breakpoints.find(brkpnt => brkpnt.name == name);
    return min.value != "0" ? min : null;
}

// Returns a blank string if smallest breakpoint, otherwise returns the name with a dash in front.
// Useful for making responsive utilities.
//
//    >> breakpoint-infix(xs, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
//    ""  (Returns a blank string)
//    >> breakpoint-infix(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
//    "-sm"
const breakpointInfix = (name, breakpoints = gridBreakpoints) => {
    const currentBreakpointMin = breakpointMin(name, breakpoints);
    const Lame = currentBreakpointMin == null ? "" : `-${currentBreakpointMin.name}`;
    // console.log("breakpointInfix", Lame);
    return Lame;
}

// Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
// Makes the @content apply to the given breakpoint and wider.
const mediaBreakpointUp = (name, breakpoints = gridBreakpoints, content = () => "") => {
    const currentBreakpointMin = breakpointMin(name, breakpoints);
    if (currentBreakpointMin) {
        return `
            @media (min-width: ${currentBreakpointMin.value}px) {
                ${content()};
            }
        `
    } else {
        return `${content()}`
    }
}

const makeColReady = (gutter = gridGutterWidth) => `
    position: relative;
    width: 100%;
    padding-right: ${gutter / 2}px;
    padding-left: ${gutter / 2}px;
`;

const makeCol = (size, $columns = gridColumns) => {
    return `
        flex: 0 0 ${size / gridColumns}%;
        max-width: ${size / gridColumns}%;
    `;
}
const makeColAuto = () => `
        flex: 0 0 auto;
        width: auto;
        max-width: 100%;
    `;

const makeColOffset = (size, columns = gridColumns) => {
    const num = size / gridColumns
    const ml = num == 0 ? `0` : `${num}%`;

    return `margin-left : ${ml}; `
}

const rowCols = (count) => `
    & > * {
        flex: 0 0 ${100 / count}%;
        max-width: ${100 / count}%;
    }
`

const makeGridColumns = (columns = gridColumns, gutter = gridGutterWidth, breakpoints = gridBreakpoints) => {
    // common prop for all breakpoints;
    var gridColumn = `
        position: relative;
        width: 100%;
        padding-right: ${gutter / 2};
        padding-left: ${gutter / 2};
    `;
    let output = "";

    breakpoints.forEach(breakpoint => {
        const infix = breakpointInfix(breakpoint.name, breakpoints);

        if (columns > 0) {
            // Allow columns to stretch full width below their breakpoints
            for (let i = 1; i <= columns; i++) {
                output += `
                    .col${infix}-${i} {
                        ${gridColumn}
                    }
                `
            }
        }

        output += `
            .col${infix},
            .col${infix}-auto {
                ${gridColumn}
            }
        `;

        const mbu = mediaBreakpointUp(breakpoint.name, breakpoints, function () {
            // Provide basic `.col-{bp}` classes for equal-width flexbox columns
            let mbuOutput = `
                .col${infix} {
                    flex-basis: 0;
                    flex-grow: 1;
                    max-width: 100%;
                }
            `;
            if (gridRowColumns > 0) {
                for (let i = 1; i <= gridRowColumns; i++) {
                    mbuOutput += ` 
                        .row-cols${infix}-${i} {
                            ${rowCols(i)};
                        }
                    `;
                }
            };

            mbuOutput += `
                .col${infix}-auto {
                    ${makeColAuto()}
                }
            `

            if (columns > 0) {
                for (let i = 1; i <= columns; i++) {
                    mbuOutput += `
                        .col${infix}-${i} {
                            ${makeCol(i, columns)}
                        }
                    `;
                }
            }

            mbuOutput += `
                .order${infix}-first {
                    order: -1
                }
                .order${infix}-last {
                    order: ${columns + 1}
                }
            `;

            for (let i = 1; i <= columns; i++) {
                mbuOutput += `
                    .order${infix}-${i} {
                        order: ${i};
                    }
                `;
            }

            if (columns > 0) {
                // columns - 1 because offsetting by the width of an entire row isn't possible
                for (let i = 0; i <= columns - 1; i++) {
                    if (!(infix == "" && i == 0)) {
                        // avoid emitting useless .offset-0
                        mbuOutput += `
                            .offset${infix}-${i} {
                                ${makeColOffset(i, columns)}
                            }
                        `;
                    }
                }
            };

            return mbuOutput
        });

        output += mbu;
        console.log("OUTPUT:", output);
        return output;
    })


}

// example of using variables
// usage: <Component /> render() => <style jsx>{colStyles}<style>

// this will ouput  => .col.jsx-2233037254 {color: midnightblue}
const selectCol = css`
    .col {
        color: midnightblue;
    }
`;

// this will ouput  => *.jsx-2233037254 {color: white}
const colStyles = css`
    * {
        color: white;
    }    
`

// 

export {

    makeCol,
    makeColReady,
    makeColAuto,
    makeColOffset,
    rowCols,
    breakpointMin,
    breakpointInfix,
    mediaBreakpointUp,
    makeGridColumns,
    colStyles,
    selectCol,
}

