# Cloudflare Pages デプロイガイド

## 概要

mini-stack-v2 は **静的サイト (SSG)** として Cloudflare Pages にデプロイされます。
投稿データはビルド時にバンドルされ、高速なサイトを実現します。

## アーキテクチャ

```
ローカル (開発)                 Cloudflare Pages
────────────                   ────────────────
pnpm dev
    │
localhost:5173/admin
    │
投稿を作成・編集
    │
posts.json 更新
    │
git push ─────────────────────▶ ビルド開始
                                    │
                                    ▼
                               pnpm build
                                    │
                                    ▼
                               静的HTML/JS生成
                                    │
                                    ▼
                               CDNにデプロイ
```

## 前提条件

- Node.js 18以上
- pnpm
- Cloudflareアカウント
- GitHub/GitLabアカウント

## デプロイ手順

### 1. GitHubにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mini-stack-v2.git
git push -u origin main
```

### 2. Cloudflare Pagesに接続

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にアクセス
2. **Workers & Pages** > **Create** をクリック
3. **Pages** > **Connect to Git** を選択
4. リポジトリを選択

### 3. ビルド設定

| 設定項目 | 値 |
|---------|-------|
| Framework preset | None |
| Build command | `pnpm install && pnpm build` |
| Build output directory | `build/client` |
| Root directory | `/` |
| Node.js version | `18` 以上 |

### 4. デプロイ

**Save and Deploy** をクリック。

初回デプロイは1〜2分かかります。2回目以降は高速です。

## 環境変数

本番環境で必要な環境変数はありません。

| 変数 | 環境 | 説明 |
|------|------|------|
| `NODE_ENV` | 自動設定 | Cloudflareでは`production` |

## カスタムドメイン

1. Cloudflare Pagesのプロジェクトページへ
2. **Custom domains** > **Set up a custom domain**
3. ドメインを入力（例: `blog.example.com`）
4. 表示されるDNSレコードを追加

### DNSレコード例

```
Type    Name    Content
CNAME   blog    your-project.pages.dev
```

## ワークフロー

### 新規投稿の作成

```bash
# 1. 開発サーバーを起動
pnpm dev

# 2. 管理ページにアクセス
open http://localhost:5173/admin

# 3. 投稿を作成して送信

# 4. コミットしてプッシュ
git add content/posts.json
git commit -m "Add new post"
git push
```

Cloudflare Pagesが自動的にリビルド・デプロイします。

### 投稿の編集

```bash
# 1. 開発サーバーを起動
pnpm dev

# 2. 投稿の「編集」をクリック、または直接アクセス:
open http://localhost:5173/admin/edit/POST_ID

# 3. 編集して保存

# 4. コミットしてプッシュ
git add content/posts.json
git commit -m "Update post"
git push
```

## ローカルでビルド確認

```bash
# 依存関係をインストール
pnpm install

# ビルド
pnpm build

# ローカルでプレビュー
pnpm start
```

## トラブルシューティング

### ビルドが "Cannot find module" で失敗する

```bash
rm -rf node_modules
pnpm install
pnpm build
```

### デプロイ後に投稿が更新されない

- `content/posts.json` がコミットされているか確認
- Cloudflare Pagesのデプロイログを確認
- ダッシュボードで **Retry deployment** を試す

### 本番環境で管理ページに警告が表示される

これは正常な動作です。管理UIは「Production Mode」メッセージを表示します。
投稿はローカルの開発モードでのみ可能です。

## パフォーマンス

静的サイトのメリット:
- **高速**: HTMLが事前生成され、CDNから配信
- **無料**: Cloudflare Pagesの無料枠で十分
- **安全**: サーバーもDBもないため攻撃対象が少ない
- **信頼性**: CDNによりグローバルに高可用性

## 無料枠の制限

| リソース | 制限 |
|----------|------|
| ビルド回数 | 500回/月 |
| 帯域幅 | 無制限 |
| サイト数 | 無制限 |

個人ブログには十分すぎる制限です。
