# ZENith Beauty

Италийн сүрчигний каталог, сагс, захиалга, профайлын урсгалтай статик дэлгүүр.

## Ажиллуулах

Төслийн хавтсанд терминал нээгээд:

```sh
python -m http.server 8000
```

Дараа нь `http://localhost:8000` хаягийг нээнэ. Нэмэлт сан болон build алхам шаардлагагүй.

## Хуудаснууд

- `index.html` — нүүр болон онцлох сүрчиг
- `brands.html`, `emegtei.html`, `eregtei.html`, `unertnii-torol.html` — каталог
- `product.html?id=naxos` — сүрчигний дэлгэрэнгүй
- `sags.html`, `checkout.html` — сагс болон захиалга
- `login.html`, `profile.html` — Gmail хэлбэрийн demo нэвтрэлт, профайл
- `salbar.html`, `tuhai.html` — салбар болон дэлгүүрийн тухай

Бүртгэл, сагс, хадгалсан сүрчиг, захиалгууд тухайн хөтчийн `localStorage`-д хадгалагдана. Нэвтрэлт нь Gmail API ашигладаггүй, зөвхөн урд талын demo урсгал юм.
