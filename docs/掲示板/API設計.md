# API設計（Server Actions）

## 1. Server Actions一覧

### 1.1 スレッド関連

| Action名 | 説明 | 認証 |
|----------|------|------|
| createThreadAction | 新規スレッド作成 | 不要 |
| updateThreadAction | スレッド編集 | パスワード |
| deleteThreadAction | スレッド論理削除 | パスワード |
| verifyThreadPasswordAction | スレッドパスワード検証 | - |

### 1.2 コメント関連

| Action名 | 説明 | 認証 |
|----------|------|------|
| createCommentAction | コメント投稿 | 不要 |
| updateCommentAction | コメント編集 | パスワード |
| deleteCommentAction | コメント論理削除 | パスワード |
| verifyCommentPasswordAction | コメントパスワード検証 | - |

### 1.3 メディア関連

| Action名 | 説明 | 認証 |
|----------|------|------|
| uploadImageAction | 画像アップロード | 不要 |
| deleteImageAction | 画像削除 | 不要 |
| uploadVideoAction | 動画アップロード | 不要 |
| deleteVideoAction | 動画削除 | 不要 |

## 2. データ取得関数（RSC用）

| 関数名 | 説明 | 用途 |
|--------|------|------|
| getThreadList | スレッド一覧取得 | 一覧画面 |
| getThreadDetail | スレッド詳細取得 | 詳細画面 |
| getThreadWithComments | スレッドとコメント取得 | 詳細画面 |

## 3. 型定義

### 3.1 入力型（Valibotスキーマ）

```typescript
import * as v from 'valibot';

// スレッド作成入力
export const CreateThreadInput = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, 'タイトルは必須です'),
    v.maxLength(100, 'タイトルは100文字以内で入力してください')
  ),
  authorName: v.pipe(
    v.string(),
    v.minLength(1, '名前は必須です'),
    v.maxLength(50, '名前は50文字以内で入力してください')
  ),
  content: v.pipe(
    v.string(),
    v.minLength(1, '本文は必須です'),
    v.maxLength(2000, '本文は2000文字以内で入力してください')
  ),
  password: v.optional(
    v.pipe(
      v.string(),
      v.minLength(4, 'パスワードは4文字以上で入力してください'),
      v.maxLength(20, 'パスワードは20文字以内で入力してください'),
      v.regex(/^[a-zA-Z0-9]+$/, 'パスワードは半角英数字のみ使用できます')
    )
  ),
  imageUrls: v.optional(
    v.pipe(
      v.array(v.string()),
      v.maxLength(4, '画像は最大4枚まで添付できます')
    )
  ),
  videoIds: v.optional(
    v.pipe(
      v.array(v.string()),
      v.maxLength(1, '動画は最大1本まで添付できます')
    )
  ),
});

// スレッド更新入力
export const UpdateThreadInput = v.object({
  title: v.optional(v.pipe(
    v.string(),
    v.minLength(1, 'タイトルは必須です'),
    v.maxLength(100, 'タイトルは100文字以内で入力してください')
  )),
  content: v.optional(v.pipe(
    v.string(),
    v.minLength(1, '本文は必須です'),
    v.maxLength(2000, '本文は2000文字以内で入力してください')
  )),
  imageUrls: v.optional(v.array(v.string())),
  videoIds: v.optional(v.array(v.string())),
});

// コメント作成入力
export const CreateCommentInput = v.object({
  threadId: v.string(),
  authorName: v.pipe(
    v.string(),
    v.minLength(1, '名前は必須です'),
    v.maxLength(50, '名前は50文字以内で入力してください')
  ),
  content: v.pipe(
    v.string(),
    v.minLength(1, '本文は必須です'),
    v.maxLength(1000, '本文は1000文字以内で入力してください')
  ),
  password: v.optional(
    v.pipe(
      v.string(),
      v.minLength(4, 'パスワードは4文字以上で入力してください'),
      v.maxLength(20, 'パスワードは20文字以内で入力してください'),
      v.regex(/^[a-zA-Z0-9]+$/, 'パスワードは半角英数字のみ使用できます')
    )
  ),
  imageUrls: v.optional(
    v.pipe(
      v.array(v.string()),
      v.maxLength(2, '画像は最大2枚まで添付できます')
    )
  ),
  videoIds: v.optional(
    v.pipe(
      v.array(v.string()),
      v.maxLength(1, '動画は最大1本まで添付できます')
    )
  ),
});

// コメント更新入力
export const UpdateCommentInput = v.object({
  content: v.optional(v.pipe(
    v.string(),
    v.minLength(1, '本文は必須です'),
    v.maxLength(1000, '本文は1000文字以内で入力してください')
  )),
  imageUrls: v.optional(v.array(v.string())),
  videoIds: v.optional(v.array(v.string())),
});

// パスワード検証入力
export const PasswordVerificationInput = v.object({
  password: v.pipe(
    v.string(),
    v.minLength(1, 'パスワードを入力してください')
  ),
});
```

### 3.2 出力型

```typescript
// Result型（エラーハンドリング用）
export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// スレッド型
export type Thread = {
  threadId: string;
  title: string;
  authorName: string;
  content: string;
  imageUrls: string[];
  videoIds: string[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastPostedAt: Date;
  commentCount?: number;
};

// コメント型
export type Comment = {
  commentId: string;
  threadId: string;
  authorName: string;
  content: string;
  imageUrls: string[];
  videoIds: string[];
  deletedAt: Date | null;
  commentNumber: number;
  createdAt: Date;
  updatedAt: Date;
};

// ページネーション型
export type PaginationMeta = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

// スレッド一覧レスポンス
export type ThreadListResponse = {
  threads: Thread[];
  pagination: PaginationMeta;
};

// スレッド詳細レスポンス
export type ThreadDetailResponse = {
  thread: Thread;
  comments: Comment[];
};
```

## 4. Server Actions詳細実装

### 4.1 スレッド作成

```typescript
'use server';

import { prisma } from '@/lib/prisma';
import { CreateThreadInput } from './schema';
import * as v from 'valibot';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function createThreadAction(
  input: v.InferInput<typeof CreateThreadInput>
): Promise<Result<Thread>> {
  try {
    // バリデーション
    const validated = v.parse(CreateThreadInput, input);
    
    // パスワードのハッシュ化
    let passwordHash: string | null = null;
    if (validated.password) {
      passwordHash = await bcrypt.hash(validated.password, 10);
    }
    
    // UUID生成（thread_プレフィックス付き）
    const threadId = `thread_${randomUUID()}`;
    
    // スレッド作成
    const thread = await prisma.thread.create({
      data: {
        threadId,
        title: validated.title,
        authorName: validated.authorName,
        content: validated.content,
        passwordHash,
        imageUrls: validated.imageUrls || [],
        videoIds: validated.videoIds || [],
      },
    });
    
    return { success: true, data: thread };
  } catch (error) {
    if (error instanceof v.ValiError) {
      return { 
        success: false, 
        error: error.issues[0].message 
      };
    }
    return { 
      success: false, 
      error: 'スレッドの作成に失敗しました' 
    };
  }
}
```

### 4.2 コメント投稿（トランザクション処理）

```typescript
'use server';

import { randomUUID } from 'crypto';

export async function createCommentAction(
  input: v.InferInput<typeof CreateCommentInput>
): Promise<Result<Comment>> {
  try {
    const validated = v.parse(CreateCommentInput, input);
    
    // パスワードのハッシュ化
    let passwordHash: string | null = null;
    if (validated.password) {
      passwordHash = await bcrypt.hash(validated.password, 10);
    }
    
    // UUID生成（comment_プレフィックス付き）
    const commentId = `comment_${randomUUID()}`;
    
    // トランザクション処理
    const result = await prisma.$transaction(async (tx) => {
      // 最新のコメント番号を取得
      const lastComment = await tx.comment.findFirst({
        where: { threadId: validated.threadId },
        orderBy: { commentNumber: 'desc' },
      });
      
      const nextNumber = (lastComment?.commentNumber || 0) + 1;
      
      // コメント作成
      const comment = await tx.comment.create({
        data: {
          commentId,
          threadId: validated.threadId,
          authorName: validated.authorName,
          content: validated.content,
          passwordHash,
          imageUrls: validated.imageUrls || [],
          videoIds: validated.videoIds || [],
          commentNumber: nextNumber,
        },
      });
      
      // スレッドの最終投稿日時を更新
      await tx.thread.update({
        where: { threadId: validated.threadId },
        data: { lastPostedAt: new Date() },
      });
      
      return comment;
    });
    
    return { success: true, data: result };
  } catch (error) {
    // エラーハンドリング
    return { 
      success: false, 
      error: 'コメントの投稿に失敗しました' 
    };
  }
}
```

### 4.3 パスワード検証

```typescript
'use server';

export async function verifyThreadPasswordAction(
  threadId: string,
  password: string
): Promise<Result<boolean>> {
  try {
    const thread = await prisma.thread.findUnique({
      where: { threadId },
      select: { passwordHash: true },
    });
    
    if (!thread || !thread.passwordHash) {
      return { 
        success: false, 
        error: 'パスワードが設定されていません' 
      };
    }
    
    const isValid = await bcrypt.compare(password, thread.passwordHash);
    
    if (!isValid) {
      return { 
        success: false, 
        error: 'パスワードが正しくありません' 
      };
    }
    
    return { success: true, data: true };
  } catch (error) {
    return { 
      success: false, 
      error: 'パスワードの検証に失敗しました' 
    };
  }
}
```

## 5. データ取得関数

### 5.1 スレッド一覧取得

```typescript
import { prisma } from '@/lib/prisma';

export async function getThreadList(
  page: number = 1,
  limit: number = 20
): Promise<ThreadListResponse> {
  const offset = (page - 1) * limit;
  
  // 削除されていないスレッドを取得
  const [threads, totalCount] = await Promise.all([
    prisma.thread.findMany({
      where: { deletedAt: null },
      orderBy: { lastPostedAt: 'desc' },
      skip: offset,
      take: limit,
      include: {
        _count: {
          select: { 
            comments: {
              where: { deletedAt: null }
            }
          }
        }
      }
    }),
    prisma.thread.count({
      where: { deletedAt: null }
    })
  ]);
  
  // レスポンス整形
  const formattedThreads = threads.map(thread => ({
    ...thread,
    commentCount: thread._count.comments,
    _count: undefined,
  }));
  
  return {
    threads: formattedThreads,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNext: page * limit < totalCount,
      hasPrev: page > 1,
    }
  };
}
```

### 5.2 スレッド詳細取得

```typescript
export async function getThreadWithComments(
  threadId: string
): Promise<ThreadDetailResponse | null> {
  const thread = await prisma.thread.findUnique({
    where: { threadId },
    include: {
      comments: {
        orderBy: { commentNumber: 'asc' }
      }
    }
  });
  
  if (!thread) {
    return null;
  }
  
  return {
    thread: {
      threadId: thread.threadId,
      title: thread.title,
      authorName: thread.authorName,
      content: thread.content,
      imageUrls: thread.imageUrls,
      videoIds: thread.videoIds,
      deletedAt: thread.deletedAt,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      lastPostedAt: thread.lastPostedAt,
    },
    comments: thread.comments,
  };
}
```

## 6. エラーハンドリング

### 6.1 エラーコード定義

```typescript
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
} as const;
```

### 6.2 エラーレスポンス

```typescript
export type ErrorResponse = {
  success: false;
  error: string;
  code?: keyof typeof ErrorCodes;
  details?: Record<string, string[]>;
};
```

## 7. セキュリティ考慮事項

1. **入力値検証**: Valibotによる厳密な型チェック
2. **SQLインジェクション対策**: Prisma ORMの使用
3. **XSS対策**: React/Next.jsの自動エスケープ
4. **CSRF対策**: Server Actionsの仕組みを活用
5. **パスワード保護**: bcryptによるハッシュ化（salt rounds: 10）