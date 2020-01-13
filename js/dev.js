function compare(a, b) {
    if (a.total > b.total) return 1;
    if (b.total > a.total) return -1;
    return 0;
}
const ajax = (url, data, callbackFunction)=>{
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: callbackFunction
    })
};
$('document').ready(() => {
    const wait = $('.wait'),
        loading = $('.loding'),
        eroorout = $('.eroorout'),
        table = document.querySelector('.out-table'),
        out = $('.out');
    const erorout = text =>{
        eroorout.textContent = text;
        eroorout.removeClass('disabled');
        out.addClass('disabled');
        wait.addClass('disabled');
        loading.addClass('disabled');
        setTimeout(() => {
            eroorout.addClass('disabled');
            wait.removeClass('disabled');
        }, 2000)
    };
    $('#seash').click(() => {
        let userName = $('#input-user-name').val();
        if (!userName) {
            return 0;
        } else {
            out.addClass('disabled');
            wait.addClass('disabled');
            loading.removeClass('disabled');
            ajax(`./../php/back.php`,`url=https://api.twitch.tv/helix/users?login=${userName}`, async result=>{
                let ParseResult = JSON.parse(result.substr(result.search(/[{]/g), result.length));
                ajax(`./../php/back.php`,`url=https://api.twitch.tv/helix/users/follows?from_id=${ParseResult.data[0].id}`, async result=>{
                    let ParseResult_2 = await JSON.parse(result.substr(result.search(/[{]/g), result.length));
                    console.log(ParseResult_2);
                    if (ParseResult_2.total == 0) {
                        erorout('Пользователь ни на кого не подписан!');
                    } else {
                        const ArrayID = ParseResult_2.data;
                        table.innerHTML = `<tr><th>Rank</th> <th>Ник</th><th>Статус</th><th>Фолловеров</th></tr>`;
                        const arrayItem = [];
                        let y = [];
                        new Promise( resolve => {
                            for (let i = 0; i < ArrayID.length; i++) {
                                if(i !== 0){
                                    y.push(`&id=${ArrayID[i].to_id}`);
                                }else{
                                    y.push(`id=${ArrayID[i].to_id}`);
                                }
                                if (i == ArrayID.length - 1) {
                                    ajax(`./../php/back.php`,`url=https://api.twitch.tv/helix/users?${encodeURIComponent(y.join(''))}`, async result=>{
                                        let UserInfo = JSON.parse(result).data;
                                        UserInfo.forEach(element=>{
                                            ajax(`./../php/back.php`,`url=https://api.twitch.tv/helix/users/follows?to_id=${element.id}`, async result=>{
                                                await arrayItem.push({
                                                    image: element.profile_image_url,
                                                    name: element.display_name,
                                                    type: element.broadcaster_type,
                                                    total: JSON.parse(result).total
                                                });
                                                if (ArrayID.length === arrayItem.length) resolve();
                                            });
                                        });
                                    });
                                }
                            }
                        }).then(async () => {
                            let newArrayItems = await arrayItem.sort(compare).reverse();
                            let count = 0;
                            newArrayItems.forEach((element, index) => {
                                if (element.name != 'BANNED') {
                                    count++;
                                    let row = document.createElement('tr');
                                    row.innerHTML = `<td>#${++index}</td><td><img src="${element.image}" alt="logo"><a target="_blank" href="https://www.twitch.tv/${element.name}">${element.name}</a></td><td>${element.type === 'partner' ? 'Партнёр' : 'Не партнёр'}</td><td>${element.total}</td>`;
                                    table.appendChild(row);
                                    if (index === count) {
                                        $('#input-user-name')[0].value = '';
                                        loading.addClass('disabled');
                                        out.removeClass('disabled');
                                    }
                                }
                            });
                        });
                    }
                });
            });
        }
    })
});
