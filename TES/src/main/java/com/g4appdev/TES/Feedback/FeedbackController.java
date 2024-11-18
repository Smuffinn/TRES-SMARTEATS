package com.g4appdev.TES.Feedback;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/getAll")
    public List<FeedbackEntity> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @PostMapping("/add")
    public FeedbackEntity addFeedback(@RequestBody FeedbackEntity feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @PutMapping("/update/{id}")
    public FeedbackEntity updateFeedback(@PathVariable Long id, @RequestBody FeedbackEntity feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return "Feedback deleted successfully";
    }
}

