"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, AlertTriangle, CheckCircle } from "lucide-react"

interface HealthData {
  bodyTemperature: string
  heartRate: string
  restingHours: string
  ruminationTime: string
  symptoms: string
}

interface HealthResult {
  riskLevel: "low" | "medium" | "high"
  likelihood: number
  recommendations: string[]
  possibleConditions: string[]
}

export function DiseaseDetection() {
  const [formData, setFormData] = useState<HealthData>({
    bodyTemperature: "",
    heartRate: "",
    restingHours: "",
    ruminationTime: "",
    symptoms: "",
  })

  const [result, setResult] = useState<HealthResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof HealthData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleHealthCheck = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/predict-disease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const healthResult = await response.json()
      setResult(healthResult)
    } catch (error) {
      console.error("Health check failed:", error)
      // Fallback assessment for demo purposes
      const temp = Number.parseFloat(formData.bodyTemperature) || 38.5
      const heartRate = Number.parseFloat(formData.heartRate) || 60
      const restingHours = Number.parseFloat(formData.restingHours) || 8
      const ruminationTime = Number.parseFloat(formData.ruminationTime) || 6

      let riskLevel: "low" | "medium" | "high" = "low"
      let likelihood = 15
      let recommendations: string[] = ["Continue regular monitoring"]
      let possibleConditions: string[] = ["Healthy"]

      // Simple risk assessment logic
      if (temp > 39.5 || heartRate > 80 || restingHours < 6 || ruminationTime < 4) {
        riskLevel = "high"
        likelihood = 75
        recommendations = [
          "Contact veterinarian immediately",
          "Isolate animal if necessary",
          "Monitor vital signs closely",
          "Ensure adequate water supply",
        ]
        possibleConditions = ["Fever/Infection", "Digestive Issues", "Stress"]
      } else if (temp > 39 || heartRate > 70 || restingHours < 7 || ruminationTime < 5) {
        riskLevel = "medium"
        likelihood = 45
        recommendations = [
          "Increase monitoring frequency",
          "Check feed quality",
          "Ensure comfortable environment",
          "Schedule veterinary check if symptoms persist",
        ]
        possibleConditions = ["Mild Stress", "Feed Quality Issues"]
      }

      if (formData.symptoms !== "none" && formData.symptoms !== "") {
        riskLevel = "high"
        likelihood = Math.max(likelihood, 65)
        if (formData.symptoms === "mastitis-signs") {
          possibleConditions = ["Mastitis"]
          recommendations = [
            "Test milk for somatic cell count",
            "Apply appropriate treatment",
            "Improve milking hygiene",
          ]
        } else if (formData.symptoms === "digestive-issues") {
          possibleConditions = ["Digestive Disorders", "Acidosis"]
          recommendations = ["Review feed composition", "Provide probiotics", "Ensure adequate fiber intake"]
        } else if (formData.symptoms === "foot-and-mouth") {
          possibleConditions = ["Foot-and-Mouth Disease"]
          recommendations = [
            "IMMEDIATE veterinary attention required",
            "Quarantine animal",
            "Report to authorities if confirmed",
          ]
        }
      }

      setResult({ riskLevel, likelihood, recommendations, possibleConditions })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="w-4 h-4" />
      case "medium":
        return <Shield className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bodyTemperature" className="text-base font-medium">
            Body Temperature (°C)
          </Label>
          <Input
            id="bodyTemperature"
            type="number"
            step="0.1"
            placeholder="e.g., 38.5"
            value={formData.bodyTemperature}
            onChange={(e) => handleInputChange("bodyTemperature", e.target.value)}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heartRate" className="text-base font-medium">
            Heart Rate (bpm)
          </Label>
          <Input
            id="heartRate"
            type="number"
            placeholder="e.g., 65"
            value={formData.heartRate}
            onChange={(e) => handleInputChange("heartRate", e.target.value)}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="restingHours" className="text-base font-medium">
            Resting/Sleeping Hours
          </Label>
          <Input
            id="restingHours"
            type="number"
            placeholder="e.g., 8"
            value={formData.restingHours}
            onChange={(e) => handleInputChange("restingHours", e.target.value)}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ruminationTime" className="text-base font-medium">
            Rumination Time (hours)
          </Label>
          <Input
            id="ruminationTime"
            type="number"
            placeholder="e.g., 6"
            value={formData.ruminationTime}
            onChange={(e) => handleInputChange("ruminationTime", e.target.value)}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms" className="text-base font-medium">
            Symptoms Observed
          </Label>
          <Select value={formData.symptoms} onValueChange={(value) => handleInputChange("symptoms", value)}>
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Select symptoms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="mastitis-signs">Mastitis Signs</SelectItem>
              <SelectItem value="digestive-issues">Digestive Issues</SelectItem>
              <SelectItem value="foot-and-mouth">Foot-and-Mouth</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Check Health Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleHealthCheck}
          disabled={!isFormValid || isLoading}
          size="lg"
          className="text-base px-8 py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Check Health
            </>
          )}
        </Button>
      </div>

      {/* Health Assessment Result */}
      {result && (
        <div className="space-y-4">
          <Card className="bg-accent/20 border-accent">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Disease Risk Level</div>
                  <Badge className={getRiskColor(result.riskLevel)}>
                    {getRiskIcon(result.riskLevel)}
                    <span className="ml-1 capitalize">{result.riskLevel} Risk</span>
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{result.likelihood}%</div>
                  <div className="text-sm text-muted-foreground">Disease Likelihood</div>
                </div>

                {result.possibleConditions.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Possible Conditions:</div>
                    <div className="flex flex-wrap gap-2">
                      {result.possibleConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {result.recommendations.length > 0 && (
            <Alert className={result.riskLevel === "high" ? "border-destructive" : ""}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Recommended Actions:</div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}
