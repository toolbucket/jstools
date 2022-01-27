# jstools
npm пакет для хелперов JavaScript

### Публикация новой версии в npm
Для того чтобы запушить новую версию необходимо предварительно зарегистрироваться в npm и быть участником проекта

- `npm login` - авторизация в npm
- `npm run prepare` - транспиляция ts -> js 
- `npm version patch` - добавление новой патч-версии пакета 
- `npm publish` - публикация файлов из `./lib/*` в npm

Для того чтобы запушить новую версию необходимо:
1. `npm login` - авторизоваться в npm в корне проекта (делается один раз)
2. Внести изменения в код и запушить их
3. `npm version patch` - создать новую патч-версию пакета
4. `npm publish` - автоматически запустит скрипт `npm run prepare` и после его выполнения запушит новую версию пакета

P.S. npm не даст запушить новую версию (`npm publish`) если есть не закомиченные изменения, так что перед тем как публиковать версию надо все пушить.
