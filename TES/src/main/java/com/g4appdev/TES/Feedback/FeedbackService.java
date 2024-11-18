package com.g4appdev.TES.Feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepository;

    public List<FeedbackEntity> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public FeedbackEntity saveFeedback(FeedbackEntity feedback) {
        return feedbackRepository.save(feedback);
    }

    public FeedbackEntity updateFeedback(Long id, FeedbackEntity feedbackDetails) {
        FeedbackEntity feedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setFirstName(feedbackDetails.getFirstName());
        feedback.setLastName(feedbackDetails.getLastName());
        feedback.setEmail(feedbackDetails.getEmail());
        feedback.setMessage(feedbackDetails.getMessage());
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}

