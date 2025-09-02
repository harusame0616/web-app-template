"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Slider } from "@workspace/ui/components/slider";
import { Switch } from "@workspace/ui/components/switch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ResultDisplay } from "./result-display";

export default function MeasurePage() {
  const [oneFootStand, setOneFootStand] = useState<number[]>([30]);
  const [twoStepDistance, setTwoStepDistance] = useState<string>("");
  const [fingerFloorDistance] = useState<number[]>([0]);
  const [squatTest, setSquatTest] = useState<string>("");
  const [fourDirectionStep, setFourDirectionStep] = useState<string>("");
  const [isSelfMeasurement, setIsSelfMeasurement] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<{
    oneFootStand: number;
    twoStepDistance: string;
    fingerFloorDistance: number;
    squatTest: string;
    fourDirectionStep: string;
    isSelfMeasurement: boolean;
  } | null>(null);

  const handleSubmit = async (): Promise<void> => {
    const results = {
      oneFootStand: oneFootStand[0] ?? 0,
      twoStepDistance,
      fingerFloorDistance: fingerFloorDistance[0] ?? 0,
      squatTest,
      fourDirectionStep,
      isSelfMeasurement,
    };
    console.log("測定結果:", results);

    setIsAnalyzing(true);
    // 仮の処理時間（3秒）
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setAnalysisResults(results);
    setShowResults(true);
  };

  if (showResults && analysisResults) {
    return (
      <ResultDisplay
        results={analysisResults}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <>
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-xl">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">解析中...</p>
            <p className="text-sm text-muted-foreground">
              測定結果を分析しています
            </p>
          </div>
        </div>
      )}
      <div className="container mx-auto max-w-2xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>体力測定結果入力</CardTitle>
            <CardDescription>
              各項目の測定結果を入力してください
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="one-foot-stand" className="font-bold">
                項目１ （{oneFootStand[0]}）
              </Label>
              <Slider
                id="one-foot-stand"
                min={0}
                max={60}
                step={1}
                value={oneFootStand}
                onValueChange={setOneFootStand}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">項目１説明</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="two-step" className="font-bold">
                項目２
              </Label>
              <Input
                id="two-step"
                type="number"
                placeholder="例: 150"
                value={twoStepDistance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTwoStepDistance(e.target.value)
                }
              />
              <p className="text-sm text-muted-foreground">項目２説明</p>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">項目３</Label>
              <RadioGroup value={squatTest} onValueChange={setSquatTest}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="proper" id="squat-proper" />
                  <Label htmlFor="squat-proper">選択肢１</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heels-lift" id="squat-heels" />
                  <Label htmlFor="squat-heels">選択肢２</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cannot" id="squat-cannot" />
                  <Label htmlFor="squat-cannot">選択肢３</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="four-direction" className="font-bold">
                項目4
              </Label>
              <Select
                value={fourDirectionStep}
                onValueChange={setFourDirectionStep}
              >
                <SelectTrigger id="four-direction">
                  <SelectValue placeholder="選択肢を選んでください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10">選択肢１</SelectItem>
                  <SelectItem value="10-15">選択肢２</SelectItem>
                  <SelectItem value="over-15">選択肢３</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">項目説明</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="self-measurement"
                checked={isSelfMeasurement}
                onCheckedChange={setIsSelfMeasurement}
              />
              <Label htmlFor="self-measurement" className="font-bold">
                項目5
              </Label>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={isAnalyzing}
            >
              測定結果を解析する
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
