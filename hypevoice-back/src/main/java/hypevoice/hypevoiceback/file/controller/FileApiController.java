package hypevoice.hypevoiceback.file.controller;

import hypevoice.hypevoiceback.file.service.FileService;
import hypevoice.hypevoiceback.global.annotation.ExtractPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileApiController {
    private final FileService fileService;

    // 실제로 사용x 테스트용 controller
    @PostMapping(value = "/upload", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload(@ExtractPayload Long userId, @RequestPart(value = "image") MultipartFile multipartFile) {
        String uploadFileUrl = fileService.uploadBoardFiles(multipartFile);
        return ResponseEntity.ok(uploadFileUrl);
    }

    // 실제로 사용x 테스트용 controller
    @DeleteMapping
    public ResponseEntity<Void> delete(@ExtractPayload Long memberId, @RequestParam(value = "url") String uploadFileUrl) {
        fileService.deleteFiles(uploadFileUrl);
        return ResponseEntity.ok().build();
    }
}
