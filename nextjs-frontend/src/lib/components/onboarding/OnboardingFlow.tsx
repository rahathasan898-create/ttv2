/**
 * File: src/lib/components/onboarding/OnboardingFlow.tsx
 * Last Modified: 28 August 2025, 10:40 PM (AEST)
 *
 * This component manages the multi-step user onboarding process. It uses a stepper
 * to guide new users through a series of setup steps, such as selecting their
 * interests, to personalize their experience.
 *
 * This is the final key feature of the V3 roadmap, designed to create a welcoming
 * and state-of-the-art user experience from the very first session.
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Define the steps in our onboarding flow
const steps = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'interests', title: 'Your Interests' },
  { id: 'complete', title: 'All Set!' },
]

// Dummy data for interests - in a real app, this would come from your CMS
const interestTopics = [
    'Growth Hacks', 'Monetization', 'Video Editing', 'Brand Deals', 'Analytics', 'Community Building'
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const router = useRouter()

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // On the last step, finish and redirect
      // Here you would typically save the user's preferences to your database (Supabase)
      console.log('Onboarding complete. Selected interests:', selectedInterests)
      router.push('/feed') // Redirect to the main feed
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome to TickTrend Australia!</h2>
                <p className="mt-2 text-muted-foreground">Let's personalize your experience. It will only take a minute.</p>
            </div>
        )
      case 'interests':
        return (
            <div>
                <h2 className="text-xl font-semibold text-center">What are you interested in?</h2>
                <p className="mt-1 text-muted-foreground text-center mb-6">Select a few topics to help us tailor your content feed.</p>
                <ToggleGroup 
                    type="multiple" 
                    variant="outline" 
                    className="flex-wrap justify-center gap-3"
                    value={selectedInterests}
                    onValueChange={(value) => setSelectedInterests(value)}
                >
                    {interestTopics.map(topic => (
                        <ToggleGroupItem key={topic} value={topic} className="rounded-full">
                            {topic}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
        )
      case 'complete':
        return (
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-2xl font-bold">You're All Set!</h2>
                <p className="mt-2 text-muted-foreground">Your personalized feed is ready. Let's dive in and start growing.</p>
            </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        {/* Stepper UI */}
        <div className="flex justify-center items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <CardTitle className="text-center pt-4">{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={goToNextStep}>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          {currentStep < steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
