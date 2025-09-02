"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Badge } from "@workspace/ui/components/badge";
import {
  Trophy,
  TrendingUp,
  Heart,
  Activity,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef } from "react";

type ResultDisplayProps = {
  results: {
    oneFootStand: number;
    twoStepDistance: string;
    fingerFloorDistance: number;
    squatTest: string;
    fourDirectionStep: string;
    isSelfMeasurement: boolean;
  };
  onBack: () => void;
};

export function ResultDisplay({ results, onBack }: ResultDisplayProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  // 仮の分析結果を生成
  const analysisResults = {
    総合スコア: 85,
    バランス能力: {
      score: 90,
      level: "優秀",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    柔軟性: {
      score: 75,
      level: "良好",
      icon: CheckCircle2,
      color: "text-blue-600",
    },
    下肢筋力: {
      score: 65,
      level: "標準",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    敏捷性: {
      score: 80,
      level: "良好",
      icon: CheckCircle2,
      color: "text-blue-600",
    },
  };

  const recommendations = [
    "バランス能力は優れています。現在の運動習慣を継続してください。",
    "柔軟性向上のため、ストレッチを日課に加えることをお勧めします。",
    "下肢筋力強化のため、スクワットや階段昇降を取り入れましょう。",
  ];

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ページサイズと余白の設定
    const pageWidth = 210;  // A4の幅
    const pageHeight = 297; // A4の高さ
    const marginTop = 15;   // 上部余白（縮小）
    const marginBottom = 15; // 下部余白（縮小）
    const marginLeft = 10;  // 左余白（縮小）
    const marginRight = 10; // 右余白（縮小）
    
    // 印刷可能エリアのサイズ
    const printableWidth = pageWidth - marginLeft - marginRight;
    const printableHeight = pageHeight - marginTop - marginBottom;
    
    // 画像のアスペクト比を保持したサイズ計算
    let imgHeight = (canvas.height * printableWidth) / canvas.width;
    
    // 1ページに収まるように縮小調整
    if (imgHeight > printableHeight) {
      // 画像が1ページを超える場合、縮小して収める
      const scaleFactor = printableHeight / imgHeight;
      const adjustedWidth = printableWidth * scaleFactor * 0.95; // 95%サイズで少し余裕を持たせる
      imgHeight = (canvas.height * adjustedWidth) / canvas.width;
      
      // センタリングのための位置調整
      const xOffset = marginLeft + (printableWidth - adjustedWidth) / 2;
      const yOffset = marginTop;
      
      pdf.addImage(imgData, "PNG", xOffset, yOffset, adjustedWidth, imgHeight);
    } else {
      // 1ページに収まる場合はそのまま配置
      pdf.addImage(imgData, "PNG", marginLeft, marginTop, printableWidth, imgHeight);
    }

      pdf.save(`体力測定結果_${new Date().toLocaleDateString("ja-JP")}.pdf`);
    } catch (error) {
      console.error("PDF生成エラー:", error);
      alert("PDF生成中にエラーが発生しました。");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div ref={resultRef} className="space-y-6 bg-white p-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            体力測定結果レポート
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* 総合スコアカード */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">総合評価</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${analysisResults.総合スコア * 3.51} 351.86`}
                  className="text-primary transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {analysisResults.総合スコア}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-semibold">優秀</span>
            </div>
          </CardContent>
        </Card>

        {/* 個別評価 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries({
            バランス能力: analysisResults.バランス能力,
            柔軟性: analysisResults.柔軟性,
            下肢筋力: analysisResults.下肢筋力,
            敏捷性: analysisResults.敏捷性,
          }).map(([key, value]) => {
            const Icon = value.icon;
            return (
              <Card key={key} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{key}</CardTitle>
                    <Badge variant="outline" className={value.color}>
                      {value.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${value.color}`} />
                    <span className="text-2xl font-bold">{value.score}点</span>
                  </div>
                  <Progress value={value.score} className="h-3" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 測定データ詳細 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              測定データ詳細
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">片足立ち</span>
                  <span className="font-semibold">
                    {results.oneFootStand}秒
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">2ステップテスト</span>
                  <span className="font-semibold">
                    {results.twoStepDistance}cm
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">指床間距離</span>
                  <span className="font-semibold">
                    {results.fingerFloorDistance}cm
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">しゃがみ込み</span>
                  <span className="font-semibold">
                    {results.squatTest === "proper"
                      ? "正しくしゃがめる"
                      : results.squatTest === "heels-lift"
                        ? "かかとが浮く"
                        : "しゃがめない"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">4方向ステップ</span>
                  <span className="font-semibold">
                    {results.fourDirectionStep === "under-10"
                      ? "10回未満"
                      : results.fourDirectionStep === "10-15"
                        ? "10-15回"
                        : "15回以上"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">測定方法</span>
                  <span className="font-semibold">
                    {results.isSelfMeasurement ? "自己測定" : "他者測定"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アドバイス */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              健康アドバイス
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* アクションボタン */}
      <div className="flex gap-4 mt-6">
        <Button onClick={onBack} variant="outline" className="flex-1">
          測定画面に戻る
        </Button>
        <Button onClick={handleDownloadPDF} className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          PDFダウンロード
        </Button>
      </div>
    </div>
  );
}
