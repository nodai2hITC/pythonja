# 初学者向け Python オンライン実行環境 🐍

- すべてブラウザ上で動作するので、環境構築の手間が不要。
- エラーメッセージが日本語で表示されるため、初学者におすすめ。
- 「現在のスクリプト」を簡単に URL として保存・受け渡し可能。
  - 例えば「わざと誤ったスクリプト」を課題として与え、修正したスクリプトを URL として提出させるなどの活動に。
  - URL の後ろに #～ でスクリプトを BASE64 化したものを付けているだけなので、非常に長くなります。長過ぎる URL が扱えないツールを使っていると上手くいきません。
- numpy や matplotlib を使用可能な拡張バージョンもあり。
  - その代わり、ページを開いてから実行可能になるまで時間がかかります。

## リンク

- [基本バージョン](https://nodai2hitc.github.io/pythonja/)
  - 標準ライブラリの多くが使用可能です。
- [拡張バージョン](https://nodai2hitc.github.io/pythonja/ex.html)
  - 標準ライブラリに加え、numpy, scipy, scikit-learn, networkx, matplotlib が使用可能です。

### 例

- [FizzBuzz](https://nodai2hitc.github.io/pythonja/#Zm9yIGkgaW4gcmFuZ2UoMSwgMTAxKToKICAgIGlmIGkgJSAxNSA9PSAwOgogICAgICAgIHByaW50KCJGaXp6QnV6eiIpCiAgICBlbGlmIGkgJSAzID09IDA6CiAgICAgICAgcHJpbnQoIkZpenoiKQogICAgZWxpZiBpICUgNSA9PSAwOgogICAgICAgIHByaW50KCJCdXp6IikKICAgIGVsc2U6CiAgICAgICAgcHJpbnQoaSkK)
- [複利法による預金金額の時間的変化](https://nodai2hitc.github.io/pythonja/ex.html#aW1wb3J0IG1hdHBsb3RsaWIucHlwbG90IGFzIHBsdCAjIOODl_ODreODg_ODiOOCquODluOCuOOCp_OCr_ODiOOCkuOCpOODs_ODneODvOODiApyaXJpdHN1ID0gMC4wNSAjIOWIqeeOhwp5b2tpbiA9IFsxMDAwMDBdICMg6aCQ6YeR6YWN5YiX44Gu5pyA5Yid44Gu5YCk44GvIDEwIOS4hwpmb3IgaSBpbiByYW5nZSgxMCk6ICNpIOOBruWApOOCkiAwIO_9niA5IOOBvuOBp_OAgTEwIOWbnue5sOOCiui-lOOBmQogICAgcmlzb2t1ID0gaW50KHlva2luW2ldKnJpcml0c3UpICMg5Yip5oGv44Gv54__5Zyo44Gu6aCQ6YeR6aGNIMOXIOWIqeeOhyAoIOaVtOaVsOWMliApCiAgICB5b2tpbi5hcHBlbmQoeW9raW5baV0rcmlzb2t1KSAjIOmFjeWIl_OBq_ioiOeul_e1kOaenOOCkui-veWKoApwbHQudGl0bGUoIkZVS1VSSSBLRUlTQU4iKSAjIOOCsOODqeODleOBruOCv_OCpOODiOODqwpwbHQueGxhYmVsKCJZZWFyIikgI1gg6Lu444Gu44Op44OZ44OrCnBsdC55bGFiZWwoIllva2luW1lFTl0iKSAjWSDou7jjga7jg6njg5njg6sKcGx0LnBsb3QoeW9raW4sIG1hcmtlcj0ibyIpICMg44Kw44Op44OV44KS44OX44Ot44OD44OICnBsdC5zaG93KCkgIyDjg5fjg63jg4Pjg4jjgqrjg5bjgrjjgqfjgq-jg4jjgpLooajnpLoK)
  - [高等学校情報科「情報Ⅰ」教員研修用教材：第3章 コンピュータとプログラミング](https://www.mext.go.jp/content/20200722-mxt_jogai02-100013300_005.pdf) 「図表 5 グラフ化のプログラム」より引用

## 利用技術

- [Pyodide](https://pyodide.org/en/stable/)
- [CodeMirror](https://codemirror.net/)

## ライセンス

- [MIT License](http://opensource.org/licenses/MIT)
