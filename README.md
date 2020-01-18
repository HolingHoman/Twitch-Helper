# Twitch-Helper
Twitch-Helper - сервис для просмотра фолловеров.
На 01.01.2020 смотреть на кого подписан пользователь нельзя. Благодоря этому приложению на API Twitch, можно.

![](https://i.ibb.co/hD4yz7T/chrome-l-Ernl3-O0-RJ.png)

***

## Для начала
> **[Node.js](https://nodejs.org/) 13.6.0 или новее**

Установить зависимости
```shell
npm i
```
Заходим в `php/back.php`
ищем строку
```php
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Client-ID: ваш клиент ID"));
```
Вставляем в Client-ID, ваш ID от API Twitch.
Пример: 
```php
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Client-ID: wv88gz31i9w3ihnkwyvnz2c64mqhlt"));
```

## P.S.
На этом всё можете открывать `index.html` и используем.