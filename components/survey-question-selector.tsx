"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search, BarChart, ListChecks, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample data
const surveys = [
  { id: "1", title: "Customer Satisfaction Survey" },
  { id: "2", title: "Employee Engagement Survey" },
  { id: "3", title: "Product Feedback Survey" },
  { id: "4", title: "Website Usability Survey" },
  { id: "5", title: "Market Research Survey" },
]

const questionTypes = {
  "multiple-choice": { icon: ListChecks, label: "Multiple Choice" },
  text: { icon: FileText, label: "Text" },
  rating: { icon: BarChart, label: "Rating" },
  "open-ended": { icon: MessageSquare, label: "Open Ended" },
}

const questions = [
  { id: "101", surveyId: "1", text: "How satisfied are you with our service?", type: "rating" },
  { id: "102", surveyId: "1", text: "What improvements would you suggest?", type: "open-ended" },
  { id: "103", surveyId: "1", text: "Would you recommend us to others?", type: "multiple-choice" },
  { id: "201", surveyId: "2", text: "How would you rate your work-life balance?", type: "rating" },
  { id: "202", surveyId: "2", text: "Do you feel valued at work?", type: "multiple-choice" },
  { id: "203", surveyId: "2", text: "What would improve your workplace experience?", type: "open-ended" },
  { id: "301", surveyId: "3", text: "Which features do you use most often?", type: "multiple-choice" },
  { id: "302", surveyId: "3", text: "How easy is our product to use?", type: "rating" },
  { id: "303", surveyId: "3", text: "What features would you like to see added?", type: "text" },
  { id: "401", surveyId: "4", text: "How easy was it to find what you were looking for?", type: "rating" },
  { id: "402", surveyId: "4", text: "Did you encounter any issues while using our website?", type: "multiple-choice" },
  { id: "501", surveyId: "5", text: "Which of our competitors do you also use?", type: "multiple-choice" },
  { id: "502", surveyId: "5", text: "What factors influence your purchasing decisions?", type: "open-ended" },
]

export default function SurveyQuestionSelector() {
  const [openSurvey, setOpenSurvey] = React.useState(false)
  const [openQuestion, setOpenQuestion] = React.useState(false)
  const [selectedSurvey, setSelectedSurvey] = React.useState<string | null>(null)
  const [selectedQuestion, setSelectedQuestion] = React.useState<string | null>(null)

  // Get the selected survey object
  const selectedSurveyObject = selectedSurvey ? surveys.find((survey) => survey.id === selectedSurvey) : null

  // Get the selected question object
  const selectedQuestionObject = selectedQuestion
    ? questions.find((question) => question.id === selectedQuestion)
    : null

  // Filter questions based on selected survey
  const filteredQuestions = selectedSurvey
    ? questions.filter((question) => question.surveyId === selectedSurvey)
    : questions

  // Group questions by survey for display when no survey is selected
  const groupedQuestions = React.useMemo(() => {
    const grouped: Record<string, typeof questions> = {}

    if (selectedSurvey) {
      // If a survey is selected, we only have one group
      grouped[selectedSurvey] = filteredQuestions
    } else {
      // Otherwise group all questions by survey
      questions.forEach((question) => {
        if (!grouped[question.surveyId]) {
          grouped[question.surveyId] = []
        }
        grouped[question.surveyId].push(question)
      })
    }

    return grouped
  }, [selectedSurvey, filteredQuestions])

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <div className="flex flex-col space-y-2">
        <label htmlFor="survey-select" className="text-sm font-medium">
          Select Survey
        </label>
        <Popover open={openSurvey} onOpenChange={setOpenSurvey}>
          <PopoverTrigger asChild>
            <Button
              id="survey-select"
              variant="outline"
              role="combobox"
              aria-expanded={openSurvey}
              className="justify-between"
            >
              {selectedSurveyObject ? selectedSurveyObject.title : "Select a survey..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search surveys..." className="h-9" />
              <CommandList>
                <CommandEmpty>No surveys found.</CommandEmpty>
                <CommandGroup>
                  {surveys.map((survey) => (
                    <CommandItem
                      key={survey.id}
                      value={survey.title}
                      onSelect={() => {
                        setSelectedSurvey(survey.id === selectedSurvey ? null : survey.id)
                        // Clear selected question if it doesn't belong to the selected survey
                        if (selectedQuestionObject && selectedQuestionObject.surveyId !== survey.id) {
                          setSelectedQuestion(null)
                        }
                        setOpenSurvey(false)
                      }}
                    >
                      <span className="flex-1">{survey.title}</span>
                      {selectedSurvey === survey.id && <Check className="h-4 w-4 text-primary" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="question-select" className="text-sm font-medium">
          Select Question
        </label>
        <Popover open={openQuestion} onOpenChange={setOpenQuestion}>
          <PopoverTrigger asChild>
            <Button
              id="question-select"
              variant="outline"
              role="combobox"
              aria-expanded={openQuestion}
              className="justify-between"
            >
              {selectedQuestionObject ? selectedQuestionObject.text : "Select a question..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search questions..." className="h-9" />
              <CommandList>
                <CommandEmpty>No questions found.</CommandEmpty>
                {Object.entries(groupedQuestions).map(([surveyId, questions]) => {
                  const survey = surveys.find((s) => s.id === surveyId)
                  return (
                    <React.Fragment key={surveyId}>
                      {!selectedSurvey && (
                        <CommandGroup heading={survey?.title}>
                          {questions.map((question) => {
                            const QuestionIcon = questionTypes[question.type as keyof typeof questionTypes]?.icon
                            return (
                              <CommandItem
                                key={question.id}
                                value={question.text}
                                onSelect={() => {
                                  setSelectedQuestion(question.id === selectedQuestion ? null : question.id)
                                  setOpenQuestion(false)
                                }}
                              >
                                {QuestionIcon && <QuestionIcon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                <span className="flex-1 truncate">{question.text}</span>
                                {selectedQuestion === question.id && <Check className="h-4 w-4 text-primary" />}
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      )}
                      {selectedSurvey &&
                        questions.map((question) => {
                          const QuestionIcon = questionTypes[question.type as keyof typeof questionTypes]?.icon
                          return (
                            <CommandItem
                              key={question.id}
                              value={question.text}
                              onSelect={() => {
                                setSelectedQuestion(question.id === selectedQuestion ? null : question.id)
                                setOpenQuestion(false)
                              }}
                            >
                              {QuestionIcon && <QuestionIcon className="mr-2 h-4 w-4 text-muted-foreground" />}
                              <span className="flex-1 truncate">{question.text}</span>
                              {selectedQuestion === question.id && <Check className="h-4 w-4 text-primary" />}
                            </CommandItem>
                          )
                        })}
                    </React.Fragment>
                  )
                })}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

