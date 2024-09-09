/* eslint-disable @typescript-eslint/no-explicit-any */
export function ReviewMessage({ selectedRating }: any) {
  if (!selectedRating) return null;

  const messages: Record<string, any> = {
    "1": "Oh no, we're sorry to hear that!",
    "2": "We appreciate your feedback.",
    "3": "Thank you! We're glad you found it okay.",
    "4": "Great! We're happy you liked it.",
    "5": "Awesome! We're thrilled you loved it!",
  };

  return (
    <div className="mt-4 text-center text-muted-foreground">
      {messages[selectedRating]}
    </div>
  );
}
