import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Code from 'components/diginext/elements/Code'
import Button from 'components/diginext/button/Button'
import COMPONENT_LIST from './COMPONENT_LIST'
import ArrayExtra from 'plugins/utils/ArrayExtra'
import { VerticalList, VerticalListAlign } from 'components/diginext/layout/ListLayout'
import { Input } from 'antd';

const ComponentCollection = props => {

    const [isInit, setisInit] = useState(false)
    const [tags, setTags] = useState([]);
    const [currentChoosingTagIndex, setCurrentChoosingTagIndex] = useState([-1]);
    const [listShow, setListShow] = useState(COMPONENT_LIST);

    // init

    useEffect(() => {

        init();
        filterByTagIndexArray(currentChoosingTagIndex)
        return () => {
        }
    }, [])

    useEffect(() => {
        if (currentChoosingTagIndex.length == 0) setCurrentChoosingTagIndex([-1])
        filterByTagIndexArray();
        return () => {
        };
    }, [currentChoosingTagIndex]);

    const init = (params) => {
        if (isInit) return;
        setisInit(true);

        setupTags();
    }

    const setupTags = (params) => {
        const list = COMPONENT_LIST.map((item) => {
            return item.tags;
        })
        const merged = [].concat.apply([], list);
        const unique = [...new Set(merged)];
        const sort = unique.sort()
        setTags(sort);
    }

    // handle tag

    const onClickTag = (index) => {
        const foundIndex = currentChoosingTagIndex.find((tagIndex) => tagIndex == index);
        if (typeof foundIndex == "undefined") {
            addChoosingTagIndex(index);
        } else {
            removeChoosingTagIndex(index);
        }
    }

    const addChoosingTagIndex = (num) => {
        if (num != -1) {
            removeChoosingTagIndex(-1);
            setCurrentChoosingTagIndex([
                ...currentChoosingTagIndex,
                num
            ])
        } else {
            setCurrentChoosingTagIndex([-1])
        }
    }
    const removeChoosingTagIndex = (num) => {
        const list = ArrayExtra.removeItem(num, currentChoosingTagIndex);
        setCurrentChoosingTagIndex([...list]);
    }

    /**
     * @param {Array} indexArray 
     */
    const filterByTagIndexArray = (indexArray) => {
        indexArray = indexArray || currentChoosingTagIndex;
        if (indexArray.findIndex((item) => item == -1) >= 0) {
            //all
            clearAllFilter();
        } else {
            const array = indexArray.map((index) => {
                return tags[index];
            })
            var result = COMPONENT_LIST.filter(function (item) {
                if (item) {
                    return ArrayExtra.allMatchInArray(item.tags, array)
                }
            })
            setListShow(result);
        }
    }

    const clearAllFilter = (params) => {
        // console.log('clearAllFilter')
        setListShow(COMPONENT_LIST)
    }

    ////
    // handle search


    const onChangeSearchByName = (params) => {
        // console.log('params :>> ', params.target.value);
        const value = params.target.value;
        searchByName(value)
    }

    const searchByName = (value) => {
        value = value.trim();
        value = value.toUpperCase();

        const list = COMPONENT_LIST.filter((item) => {
            if (item) if (item.name) return item.name.toUpperCase().indexOf(value) >= 0;
        })
        setListShow(list)
    }


    return (
        <>
            <style global jsx>{`
                html, body{
                   background-color: black;
                   color: white;
                }
            `}</style>
            <style jsx>{`
                .itemComponemt{
                    padding: 20px;
                }
         `}</style>
            <div className="tagsButton">
                <Button active={currentChoosingTagIndex.find((item) => item == -1)} key={-1} onClick={(item2) => {
                    onClickTag(-1);
                }}>All Filter
                </Button>
                {tags.map((tag, index) => {
                    return <Button active={currentChoosingTagIndex.find((item) => item == index) >= 0} key={index}
                        onClick={(item2) => {
                            onClickTag(index);
                        }}
                    >{tag}
                    </Button>
                })}
            </div>

            <Input placeholder="search By name" onChange={onChangeSearchByName} />

            <VerticalList align="center">
                {listShow.map((item, index) => {
                    return <div className="itemComponemt" key={index}>
                        <p>{item.name}</p>
                        {item.components}
                        {item.code ? <Code>
                            {item.code}
                        </Code>
                            : <></>
                        }
                    </div>
                })}
            </VerticalList>

        </>
    )
}

ComponentCollection.propTypes = {
}

export default ComponentCollection