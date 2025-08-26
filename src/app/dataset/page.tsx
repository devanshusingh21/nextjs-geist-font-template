"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DatasetPage() {
  const birdSpecies = [
    {
      name: "American Robin",
      scientificName: "Turdus migratorius",
      description: "A common North American songbird known for its distinctive red breast and melodic song.",
      habitat: "Gardens, parks, woodlands",
      callCharacteristics: "Clear, liquid notes in phrases of 2-3 syllables"
    },
    {
      name: "House Sparrow",
      scientificName: "Passer domesticus",
      description: "Small, social birds commonly found in urban and suburban areas worldwide.",
      habitat: "Cities, towns, farmlands",
      callCharacteristics: "Simple chirps and cheeps, often in rapid succession"
    },
    {
      name: "Blue Jay",
      scientificName: "Cyanocitta cristata",
      description: "Intelligent corvids known for their bright blue coloration and complex vocalizations.",
      habitat: "Deciduous and mixed forests, parks",
      callCharacteristics: "Harsh 'jay-jay' calls, also mimics other birds"
    },
    {
      name: "Northern Cardinal",
      scientificName: "Cardinalis cardinalis",
      description: "Vibrant red songbirds (males) with distinctive crests and strong, thick bills.",
      habitat: "Woodlands, gardens, shrublands",
      callCharacteristics: "Clear whistles: 'birdy-birdy-birdy' or 'cheer-cheer-cheer'"
    },
    {
      name: "Common Crow",
      scientificName: "Corvus brachyrhynchos",
      description: "Large, intelligent black birds known for their problem-solving abilities.",
      habitat: "Various habitats from forests to cities",
      callCharacteristics: "Harsh 'caw-caw' calls, various croaks and rattles"
    },
    {
      name: "Mourning Dove",
      scientificName: "Zenaida macroura",
      description: "Gentle, gray-brown doves with distinctive mournful cooing sounds.",
      habitat: "Open woodlands, fields, suburban areas",
      callCharacteristics: "Soft, mournful 'coo-OO-oo-oo' calls"
    },
    {
      name: "Red-winged Blackbird",
      scientificName: "Agelaius phoeniceus",
      description: "Males display bright red and yellow shoulder patches during breeding season.",
      habitat: "Wetlands, marshes, fields",
      callCharacteristics: "Distinctive 'conk-la-ree' song, various chatters"
    },
    {
      name: "European Starling",
      scientificName: "Sturnus vulgaris",
      description: "Introduced species known for their iridescent plumage and vocal mimicry.",
      habitat: "Cities, farms, open woodlands",
      callCharacteristics: "Complex songs with whistles, clicks, and mimicked sounds"
    }
  ];

  const datasetStats = {
    totalSpecies: 8,
    totalRecordings: "1,200+",
    avgDuration: "15 seconds",
    sampleRate: "22.05 kHz",
    format: "WAV, MP3",
    features: "MFCC (40 coefficients)"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            Bird Audio Dataset
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive collection of bird audio recordings used for training and evaluating 
            our acoustic classification model. Each species is represented with diverse call patterns 
            and environmental conditions.
          </p>
        </div>

        {/* Dataset Overview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dataset Overview</CardTitle>
            <CardDescription>
              Key statistics and technical specifications of our bird audio dataset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{datasetStats.totalSpecies}</div>
                <div className="text-sm text-slate-600">Species</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{datasetStats.totalRecordings}</div>
                <div className="text-sm text-slate-600">Recordings</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{datasetStats.avgDuration}</div>
                <div className="text-sm text-slate-600">Avg Duration</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{datasetStats.sampleRate}</div>
                <div className="text-sm text-slate-600">Sample Rate</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{datasetStats.format}</div>
                <div className="text-sm text-slate-600">Formats</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{datasetStats.features}</div>
                <div className="text-sm text-slate-600">Features</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Audio */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sample Audio</CardTitle>
            <CardDescription>
              Listen to a sample bird recording from our dataset
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Sample Bird Recording</h3>
                  <p className="text-sm text-slate-600">Synthetic bird call for demonstration</p>
                </div>
                <Badge variant="secondary">WAV Format</Badge>
              </div>
              <audio 
                controls 
                className="w-full"
                preload="metadata"
              >
                <source src="/backend/dataset/sample_bird.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-xs text-slate-500 mt-2">
                Note: This is a synthetic audio sample created for demonstration purposes. 
                In a production system, this would be replaced with real bird recordings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Species Information */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Supported Bird Species</CardTitle>
            <CardDescription>
              Detailed information about each bird species in our classification system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {birdSpecies.map((species, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{species.name}</h3>
                        <p className="text-sm italic text-slate-600">{species.scientificName}</p>
                      </div>
                      <Badge variant="outline">ID: {index}</Badge>
                    </div>
                    
                    <p className="text-sm text-slate-700">{species.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Habitat</span>
                        <p className="text-sm text-slate-700">{species.habitat}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Call Characteristics</span>
                        <p className="text-sm text-slate-700">{species.callCharacteristics}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>
              How our acoustic classification system processes and analyzes bird audio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Audio Processing Pipeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Audio loading and resampling (22.05 kHz)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">MFCC feature extraction (40 coefficients)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Feature normalization and averaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Neural network classification</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Model Architecture</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Input Layer: 40 MFCC features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Hidden Layer 1: 128 neurons (ReLU)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Hidden Layer 2: 64 neurons (ReLU)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Output Layer: 8 species (Softmax)</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-semibold text-amber-800 mb-2">Note on Demo Model</h5>
              <p className="text-sm text-amber-700">
                This is a demonstration system with a simplified model architecture. 
                In a production environment, the model would be trained on thousands of real bird recordings 
                with more sophisticated architectures like CNNs or RNNs for better accuracy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">
                Ready to Test the System?
              </h3>
              <p className="text-slate-600">
                Upload your own bird audio recordings and see our classification system in action.
              </p>
              <Button asChild>
                <a href="/bird-classification">
                  Try Bird Classification
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
