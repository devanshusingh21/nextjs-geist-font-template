"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const features = [
    {
      title: "Real-time Classification",
      description: "Upload audio files and get instant bird species identification with confidence scores.",
      icon: "🎵"
    },
    {
      title: "8 Bird Species",
      description: "Trained to recognize common North American bird species with high accuracy.",
      icon: "🐦"
    },
    {
      title: "MFCC Analysis",
      description: "Uses advanced audio feature extraction for robust classification performance.",
      icon: "📊"
    },
    {
      title: "Easy to Use",
      description: "Simple drag-and-drop interface with detailed results and probability scores.",
      icon: "✨"
    }
  ];

  const supportedSpecies = [
    "American Robin", "House Sparrow", "Blue Jay", "Northern Cardinal",
    "Common Crow", "Mourning Dove", "Red-winged Blackbird", "European Starling"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI-Powered Bird Monitoring
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Acoustic Bird
                <br />
                <span className="text-yellow-300">Classification</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Monitor bird populations through advanced audio analysis. Upload recordings to identify 
              species instantly using machine learning technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/bird-classification">
                  Start Classification
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/dataset">
                  View Dataset
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">The Challenge</CardTitle>
            <CardDescription className="text-lg">
              Why acoustic bird monitoring matters for biodiversity research
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="font-semibold text-slate-900">Labor-Intensive Monitoring</h3>
                <p className="text-slate-600 text-sm">
                  Traditional field-based bird observation requires extensive human resources 
                  and is limited by time and weather conditions.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl">⏰</div>
                <h3 className="font-semibold text-slate-900">Time Limitations</h3>
                <p className="text-slate-600 text-sm">
                  Manual surveys can only capture brief snapshots of bird activity, 
                  missing important behavioral patterns and seasonal variations.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-4xl">❌</div>
                <h3 className="font-semibold text-slate-900">Human Error</h3>
                <p className="text-slate-600 text-sm">
                  Species identification accuracy varies with observer experience, 
                  leading to inconsistent data quality across studies.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h4 className="font-semibold text-blue-900 mb-2">Our Solution</h4>
              <p className="text-blue-800">
                Automated acoustic monitoring using machine learning enables continuous, 
                accurate bird species identification from remote audio recordings, 
                providing researchers with reliable biodiversity data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-900">System Features</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Advanced machine learning technology for accurate bird species identification
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Supported Species */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Supported Bird Species</h2>
            <p className="text-lg text-slate-600">
              Our model can identify these common North American bird species
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {supportedSpecies.map((species, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🐦</div>
                <p className="font-medium text-slate-900 text-sm">{species}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="text-lg text-slate-600">
            Simple steps to classify bird species from audio recordings
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-slate-900">Upload Audio</h3>
            <p className="text-slate-600 text-sm">
              Upload your bird audio recording in WAV, MP3, or other supported formats
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-semibold text-slate-900">Feature Extraction</h3>
            <p className="text-slate-600 text-sm">
              Our system extracts MFCC features from the audio for analysis
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="font-semibold text-slate-900">AI Classification</h3>
            <p className="text-slate-600 text-sm">
              Neural network analyzes features to identify the bird species
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h3 className="font-semibold text-slate-900">Get Results</h3>
            <p className="text-slate-600 text-sm">
              Receive species identification with confidence scores and probabilities
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Monitoring?</h2>
          <p className="text-xl text-slate-300">
            Upload your bird audio recordings and discover the species in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/bird-classification">
                Try Classification Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-400 text-slate-300 hover:bg-slate-800">
              <Link href="/dataset">
                Explore Dataset
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-600">
            Acoustic Bird Classification System - Advancing biodiversity monitoring through AI
          </p>
        </div>
      </footer>
    </div>
  );
}
