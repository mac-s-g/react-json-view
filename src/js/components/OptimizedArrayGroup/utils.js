export function getArrayGroupState(start, expandFirstGroup, groups) {
    const expandedArray = []
    for(let i=0; i < groups; i++) {
        if(!i && !start && expandFirstGroup) {
            expandedArray.push(true)
            continue
        }

        expandedArray.push(false)
    }

    return expandedArray
}