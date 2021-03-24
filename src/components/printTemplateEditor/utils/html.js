export function buildTable(content) {
    return `<table style="border-collapse: collapse; width: 100%; height: 106px;" border="1" data-mce-id="__mce">
    ${content}
    </table>`
}

export function buildTableThead(columns) {
    let td = `<td>序号</td>`;
    columns.forEach(x => {
        td += `<td>${x.value}</td>`
    });
    return `<thead>
        <tr style="height: 37px;">
            ${td}
        </tr>
    </thead>`
}

export function buildTableTbody(columns, detailsName = 'details') {
    let td = `<td v-html="index+1">{index}</td>`;
    columns.forEach(x => {
        td += `<td>{{row.${x.alias}}}</td>`
    });
    return `<tbody>
        <tr v-for="(row, index) in ${detailsName}">
            ${td}
        </tr>
    </tbody>`
}