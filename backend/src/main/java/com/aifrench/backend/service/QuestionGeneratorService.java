package com.aifrench.backend.service;

import com.aifrench.backend.domain.Question;
import com.aifrench.backend.domain.Vocabulary;
import com.aifrench.backend.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
public class QuestionGeneratorService {
    private static final AtomicLong COUNTER = new AtomicLong();
    private final VocabularyRepository vocabRepo;

    public List<Question> generateLevelQuestions(int levelNumber) {

        String difficulty = mapDifficulty(levelNumber);

        List<Vocabulary> words =
                vocabRepo.findRandomByDifficulty(difficulty, 10);

        List<Question> questions = new ArrayList<>();

        for (Vocabulary v : words) {

            // mix question types
            int type = ThreadLocalRandom.current().nextInt(3);

            if (type == 0) {
                questions.add(buildMcq(v));
            } else if (type == 1) {
                questions.add(buildTranslate(v));
            } else {
                questions.add(buildFillBlank(v));
            }
        }

        return questions;
    }

    private Question buildMcq(Vocabulary v) {

        Question q = new Question();
        q.setType("mcq");
        q.setQuestion("What is the meaning of \"" + v.getFrenchWord() + "\"?");
        q.setCorrectAnswer(v.getEnglishWord());
        q.setId(1L);
        // simple distractors (you can improve later)
        List<String> options = new ArrayList<>();
        options.add(v.getEnglishWord());
        options.add("option A");
        options.add("option B");
        options.add("option C");

        Collections.shuffle(options);

        q.setOptions(options);
        q.setDifficulty(v.getDifficulty());

        return q;
    }
    private Question buildTranslate(Vocabulary v) {

        Question q = new Question();
        q.setType("translate");
        q.setId(2L);
        q.setQuestion("Translate to English: \"" + v.getFrenchWord() + "\"");
        q.setCorrectAnswer(v.getEnglishWord());
        q.setDifficulty(v.getDifficulty());

        return q;
    }
    private Question buildFillBlank(Vocabulary v) {

        Question q = new Question();
        q.setType("fill_blank");
        q.setId(3L);
        String sentence = v.getExampleSentence(); // must exist in Vocabulary
        if (sentence == null || !sentence.contains(v.getFrenchWord())) {
            sentence = "Je ___ un mot."; // fallback
        }

        String blanked = sentence.replace(
                v.getFrenchWord(),
                "_____"
        );

        q.setQuestion(blanked);
        q.setCorrectAnswer(v.getFrenchWord());
        q.setDifficulty(v.getDifficulty());

        return q;
    }

    private String mapDifficulty(int level) {
        if (level <= 15) return "A1";
        if (level <= 35) return "MEDIUM";
        return "HARD";
    }
}
