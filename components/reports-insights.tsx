"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, BarChart3, PieChartIcon, FileText } from "lucide-react"

// Sample data for charts
const milkYieldData = [
  { date: "Mon", yield: 18.5, target: 20 },
  { date: "Tue", yield: 19.2, target: 20 },
  { date: "Wed", yield: 17.8, target: 20 },
  { date: "Thu", yield: 20.1, target: 20 },
  { date: "Fri", yield: 19.7, target: 20 },
  { date: "Sat", yield: 18.9, target: 20 },
  { date: "Sun", yield: 19.4, target: 20 },
]

const feedUtilizationData = [
  { type: "Green Fodder", amount: 45, cost: 1200 },
  { type: "Dry Fodder", amount: 25, cost: 800 },
  { type: "Concentrates", amount: 20, cost: 1500 },
  { type: "Supplements", amount: 10, cost: 600 },
]

const healthRiskData = [
  { name: "Healthy", value: 75, color: "#00213fff" },
  { name: "Low Risk", value: 15, color: "#ff9500ff" },
  { name: "Medium Risk", value: 8, color: "#8b5b29" },
  { name: "High Risk", value: 2, color: "#dc2626" },
]

const reportTypes = [
  {
    title: "Milk Yield Trends",
    description: "Weekly and monthly milk production analysis",
    icon: TrendingUp,
    type: "milk-yield",
  },
  {
    title: "Feed Utilization",
    description: "Feed consumption and cost analysis",
    icon: BarChart3,
    type: "feed-utilization",
  },
  {
    title: "Animal Health Records",
    description: "Health monitoring and veterinary records",
    icon: FileText,
    type: "health-records",
  },
  {
    title: "Disease Risk Analysis",
    description: "Risk assessment and prevention insights",
    icon: PieChartIcon,
    type: "disease-risk",
  },
]

export function ReportsInsights() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async (reportType: string, format: "csv" | "excel" | "pdf") => {
    setIsGenerating(true)

    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would call an API endpoint
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportType, format }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${reportType}-report.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Report generation failed:", error)
      // For demo purposes, create a simple CSV download
      const csvContent = generateSampleCSV(reportType)
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportType}-report.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSampleCSV = (reportType: string) => {
    switch (reportType) {
      case "milk-yield":
        return (
          "Date,Milk Yield (L),Target (L)\n" + milkYieldData.map((d) => `${d.date},${d.yield},${d.target}`).join("\n")
        )
      case "feed-utilization":
        return (
          "Feed Type,Amount (kg),Cost (₹)\n" +
          feedUtilizationData.map((d) => `${d.type},${d.amount},${d.cost}`).join("\n")
        )
      case "health-records":
        return (
          "Date,Animal ID,Temperature,Heart Rate,Status\n" +
          "Mon,C001,38.5,65,Healthy\nTue,C002,39.1,72,Monitor\nWed,C003,38.2,60,Healthy"
        )
      case "disease-risk":
        return (
          "Risk Level,Percentage,Count\n" +
          healthRiskData.map((d) => `${d.name},${d.value}%,${Math.round(d.value * 0.5)}`).join("\n")
        )
      default:
        return "Report data not available"
    }
  }

  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Milk Yield Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Milk Yield Trends
            </CardTitle>
            <CardDescription>Weekly milk production vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={milkYieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#00213fff" strokeWidth={2} name="Actual Yield" />
                <Line type="monotone" dataKey="target" stroke="#8b5b29" strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feed Utilization Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Feed Utilization
            </CardTitle>
            <CardDescription>Feed consumption by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={feedUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#00213fff" name="Amount (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Health Risk Distribution */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Health Risk Distribution
            </CardTitle>
            <CardDescription>Current health status across the herd</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={healthRiskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {healthRiskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                {healthRiskData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Generate Reports
          </CardTitle>
          <CardDescription>Export detailed reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => (
              <Card key={report.type} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <report.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-base mb-1">{report.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateReport(report.type, "csv")}
                          disabled={isGenerating}
                          className="text-xs"
                        >
                          CSV
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateReport(report.type, "excel")}
                          disabled={isGenerating}
                          className="text-xs"
                        >
                          Excel
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGenerateReport(report.type, "pdf")}
                          disabled={isGenerating}
                          className="text-xs"
                        >
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
