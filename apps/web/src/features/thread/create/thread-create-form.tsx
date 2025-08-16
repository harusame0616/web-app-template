"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ThreadCreateFormData = {
  title: string;
  name: string;
  content: string;
  password?: string;
  images?: FileList;
  video?: FileList;
};

export function ThreadCreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ThreadCreateFormData>({
    defaultValues: {
      title: "",
      name: "",
      content: "",
      password: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");

  const watchImages = watch("images");
  const watchVideo = watch("video");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreview(previews.slice(0, 4));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ThreadCreateFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          type="text"
          placeholder="スレッドのタイトルを入力"
          {...register("title", {
            required: "タイトルは必須です",
            maxLength: {
              value: 100,
              message: "タイトルは100文字以内で入力してください",
            },
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input
          id="name"
          type="text"
          placeholder="投稿者名を入力"
          {...register("name", {
            required: "名前は必須です",
            maxLength: {
              value: 50,
              message: "名前は50文字以内で入力してください",
            },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">本文</Label>
        <Textarea
          id="content"
          placeholder="スレッドの内容を入力"
          rows={10}
          {...register("content", {
            required: "本文は必須です",
            maxLength: {
              value: 2000,
              message: "本文は2000文字以内で入力してください",
            },
          })}
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード（任意）</Label>
        <Input
          id="password"
          type="password"
          placeholder="編集・削除時に必要"
          {...register("password", {
            minLength: {
              value: 4,
              message: "パスワードは4文字以上で入力してください",
            },
            maxLength: {
              value: 20,
              message: "パスワードは20文字以内で入力してください",
            },
          })}
        />
        <p className="text-sm text-gray-600">※ 編集・削除時に必要（任意）</p>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">画像添付（最大4枚）</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          {...register("images", {
            validate: {
              maxFiles: (files) =>
                !files || files.length <= 4 || "画像は最大4枚までです",
              fileSize: (files) => {
                if (!files) return true;
                for (const file of Array.from(files)) {
                  if (file.size > 5 * 1024 * 1024) {
                    return "画像は5MB以下にしてください";
                  }
                }
                return true;
              },
            },
          })}
          onChange={(e) => {
            register("images").onChange(e);
            handleImageChange(e);
          }}
        />
        {errors.images && (
          <p className="text-sm text-red-600">{errors.images.message}</p>
        )}
        {imagePreview.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {imagePreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`プレビュー ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="video">動画添付（最大1本）</Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          {...register("video", {
            validate: {
              fileSize: (files) => {
                if (!files || files.length === 0) return true;
                const file = files[0];
                if (file.size > 50 * 1024 * 1024) {
                  return "動画は50MB以下にしてください";
                }
                return true;
              },
            },
          })}
          onChange={(e) => {
            register("video").onChange(e);
            handleVideoChange(e);
          }}
        />
        {errors.video && (
          <p className="text-sm text-red-600">{errors.video.message}</p>
        )}
        {videoPreview && (
          <video
            src={videoPreview}
            controls
            className="w-full max-h-80 rounded-lg border mt-4"
          />
        )}
      </div>

      <div className="space-y-2">
        <Button type="submit" disabled className="w-full">
          スレッドを作成
        </Button>
        <p className="text-center text-sm text-red-600 font-semibold">
          ※ デモのため、実際にはスレッドを作成できません
        </p>
      </div>
    </form>
  );
}
