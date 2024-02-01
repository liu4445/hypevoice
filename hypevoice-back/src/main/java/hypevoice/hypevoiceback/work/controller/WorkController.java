package hypevoice.hypevoiceback.work.controller;

import hypevoice.hypevoiceback.global.annotation.ExtractPayload;
import hypevoice.hypevoiceback.work.dto.WorkRequest;
import hypevoice.hypevoiceback.work.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/voices/{voiceId}/works")
public class WorkController {

    private final WorkService workService;

    @PostMapping
    public ResponseEntity<Void> createWork(@ExtractPayload Long memberId, @PathVariable Long voiceId, @RequestBody WorkRequest request) {
        workService.registerWork(memberId, voiceId, request.title(), request.videoLink(), request.photoUrl(), request.scriptUrl(), request.recordUrl(), request.info(), request.isRep());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{workId}")
    public ResponseEntity<Void> updateWork(@ExtractPayload Long memberId, @PathVariable Long voiceId, @PathVariable Long workId, @RequestBody WorkRequest request) {
        workService.updateWork(memberId, voiceId, workId, request.title(), request.videoLink(), request.photoUrl(), request.scriptUrl(), request.recordUrl(), request.info(), request.isRep());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{workId}")
    public ResponseEntity<Void> deleteWork(@ExtractPayload Long memberId, @PathVariable Long voiceId, @PathVariable Long workId) {
        workService.deleteWork(memberId, voiceId, workId);
        return ResponseEntity.ok().build();
    }
}
